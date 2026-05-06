import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import { MailService } from 'src/mail/mail.service';
import { Role } from 'src/types/types';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateReviewerDto } from './dto/create-reviewer.dto';
import { UpdateReviewerDto } from './dto/update-reviewer.dto';
import { Reviewer } from './entities/reviewer.entity';

@Injectable()
export class ReviewerService {
  constructor(
    @InjectRepository(Reviewer)
    private readonly reviewerRepository: Repository<Reviewer>,
    private readonly userService: UserService,
    private mailService: MailService,
    private readonly configService: ConfigService,
  ) {}
  async create(createReviewerDto: CreateReviewerDto) {
    const { user } = createReviewerDto;

    const existingUser = await this.userService.findByEmail(user.email);

    if (existingUser)
      throw new ConflictException('User with this email already exists');

    const displayOrder = await this.findOneByDisplayOrder(
      createReviewerDto.display_order,
    );

    if (displayOrder)
      throw new ConflictException(
        'Reviewer with this display order already exists',
      );

    try {
      const rawToken = crypto.randomBytes(32).toString('hex');
      const invite_token = crypto
        .createHash('sha256')
        .update(rawToken)
        .digest('hex');
      const invite_expiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h

      const reviewer = await this.reviewerRepository.save({
        ...createReviewerDto,
        user: {
          ...user,
          role: Role.REVIEWER,
          invite_token,
          invite_expiry,
        },
      });

      const FRONTEND_URL = this.configService.get<string>('FRONTEND_URL');

      await this.mailService.sendEmail(
        user.email,
        'SCM Conference Reviewer Registration',
        'create-reviewer-email',
        {
          name: user.name,
          link: `${FRONTEND_URL}/set-password?token=${rawToken}`,
        },
      );

      return {
        status: 'success',
        statusCode: 200,
        data: reviewer,
        message: 'Reviewer created successfully',
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Failed to create reviewer');
    }
  }

  async findAll() {
    const [reviewers, count] = await this.reviewerRepository.findAndCount({
      select: {
        id: true,
        display_order: true,
        is_active: true,
        user: {
          id: true,
          name: true,
          email: true,
        },
      },
      relations: ['user'],
      order: { display_order: 'ASC' },
    });
    return {
      status: 'success',
      statuscode: 200,
      data: reviewers,
      count,
    };
  }

  async findOne(id: string) {
    const reviewer = await this.reviewerRepository.findOne({
      where: {
        id,
        is_active: true,
      },
    });
    if (!reviewer) {
      throw new NotFoundException('Reviewer not found');
    }
    return {
      status: 'success',
      statuscode: 200,
      data: reviewer,
    };
  }

  async findOneByDisplayOrder(display_order: number) {
    return this.reviewerRepository.findOne({
      where: {
        display_order,
      },
    });
  }

  async findReviewerWithAsign(
    user: User,
  ): Promise<(Reviewer & { assignCount: number }) | null> {
    const qb = this.reviewerRepository
      .createQueryBuilder('rw')
      .leftJoin('rw.user', 'u')
      .addSelect(['u.name', 'u.email'])
      .leftJoin('rw.abstractAssigns', 'ar', 'ar.is_agreed IS NOT FALSE')
      .addSelect('COUNT(ar.id)', 'assignCount')
      .where('rw.is_active = true')
      .andWhere('u.id != :userId', { userId: user.id })
      .groupBy('rw.id')
      .addGroupBy('u.id')
      .orderBy('assignCount', 'ASC')
      .addOrderBy('rw.display_order', 'ASC')
      .limit(1);

    const { entities, raw } = await qb.getRawAndEntities();

    if (!entities.length) return null;

    return {
      ...entities[0],
      assignCount: Number(raw[0].assignCount),
    };
  }

  async findUserByReviewerId(reviewerId: string) {
    const reviewer = await this.reviewerRepository.findOne({
      where: {
        id: reviewerId,
        is_active: true,
      },
      relations: ['user'],
    });
    if (!reviewer) {
      throw new NotFoundException('Reviewer not found');
    }
    return reviewer.user;
  }

  async findAbstract(user: User) {
    const asbtracts = await this.reviewerRepository.findOne({
      where: { userId: user.id },
      relations: {
        abstractAssigns: {
          abstract: true,
        },
      },
    });

    return {
      data: asbtracts?.abstractAssigns || [],
      count: asbtracts?.abstractAssigns.length,
      status: 'success',
      statusCode: 200,
    };
  }

  async findNextReviewerForReassign(
    abstractId: string,
  ): Promise<(Reviewer & { assignCount: number }) | null> {
    const qb = this.reviewerRepository
      .createQueryBuilder('rw')
      .leftJoin('rw.user', 'u')
      .addSelect(['u.name', 'u.email'])
      .leftJoin('rw.abstractAssigns', 'ar', 'ar.is_agreed = TRUE')
      .addSelect('COUNT(ar.id)', 'assignCount')
      .where('rw.is_active = true')
      // ❌ exclude abstract author
      .andWhere((qb) => {
        const sub = qb
          .subQuery()
          .select('1')
          .from('abstracts', 'a')
          .where('a.id = :abstractId')
          .andWhere('a.userId = u.id')
          .getQuery();

        return `NOT EXISTS ${sub}`;
      })
      // ❌ exclude ANY reviewer who ever had this abstract
      .andWhere((qb) => {
        const sub = qb
          .subQuery()
          .select('1')
          .from('abstract_assign', 'aa')
          .where('aa.reviewerId = rw.id')
          .andWhere('aa.abstractId = :abstractId')
          .getQuery();
        return `NOT EXISTS ${sub}`;
      })
      .setParameter('abstractId', abstractId)
      .groupBy('rw.id')
      .addGroupBy('u.id')
      .orderBy('assignCount', 'ASC')
      .addOrderBy('rw.display_order', 'ASC')
      .limit(1);

    const { entities, raw } = await qb.getRawAndEntities();

    if (!entities.length) return null;

    return {
      ...entities[0],
      assignCount: Number(raw[0].assignCount),
    };
  }

  async changeReviewerStatus(id: string, updateReviewerDto: UpdateReviewerDto) {
    const { is_active } = updateReviewerDto;

    const reviewer = await this.reviewerRepository.findOne({
      where: {
        id,
      },
      relations: {
        abstractAssigns: true,
      },
    });

    if (!reviewer) throw new NotFoundException('Reviewer is not found');

    if (reviewer.abstractAssigns)
      throw new NotAcceptableException(
        `This reviewer has assign ${reviewer.abstractAssigns.length} abstract.`,
      );
    if (is_active) {
      await this.userService.changeRole({
        role: Role.REVIEWER,
        userId: reviewer.userId,
      });
    } else {
      await this.userService.changeRole({
        role: Role.RESEARCHER,
        userId: reviewer.userId,
      });
    }

    const updatedReviewer = await this.reviewerRepository.update(
      id,
      updateReviewerDto,
    );

    return {
      status: 'success',
      statusCode: 200,
      data: updatedReviewer,
      message: `Reviewer is ${is_active ? 'active' : 'inactive'} now`,
    };
  }

  update(id: number, updateReviewerDto: UpdateReviewerDto) {
    return `This action updates a #${id} reviewer`;
  }

  remove(id: number) {
    return `This action removes a #${id} reviewer`;
  }
}
