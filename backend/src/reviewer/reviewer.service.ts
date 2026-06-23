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
import { REVIEWER_SEED_DATA } from 'src/config/seed-data';
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

  async createSeed(createReviewerDto: CreateReviewerDto) {
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
      relations: ['user', 'abstractAssigns'],
      order: { display_order: 'ASC' },
    });
    return {
      status: 'success',
      statuscode: 200,
      data: reviewers,
      count,
    };
  }

  async findAllReviewerWithStats() {
    const reviewers = await this.reviewerRepository
      .createQueryBuilder('rw')

      // reviewer user
      .leftJoin('rw.user', 'u')

      // assignments
      .leftJoin('rw.abstractAssigns', 'aa')

      // abstract
      .leftJoin('aa.abstract', 'ab')

      // review table
      .leftJoin('ab.abstract_review', 'ar')

      .select([
        'rw.id AS id',
        'rw.display_order AS display_order',
        'rw.is_active AS is_active',

        'u.id AS user_id',
        'u.name AS name',
        'u.email AS email',
      ])

      // total assigned
      .addSelect('COUNT(DISTINCT aa.id)', 'total_assigned')

      // agreed
      .addSelect(
        `
      COUNT(
        DISTINCT CASE
          WHEN aa.is_agreed = true THEN aa.id
        END
      )
      `,
        'total_agreed',
      )

      // declined
      .addSelect(
        `
      COUNT(
        DISTINCT CASE
          WHEN aa.is_agreed = false THEN aa.id
        END
      )
      `,
        'total_declined',
      )

      // pending (null)
      .addSelect(
        `
      COUNT(
        DISTINCT CASE
          WHEN aa.is_agreed IS NULL THEN aa.id
        END
      )
      `,
        'total_pending',
      )

      // completed review
      .addSelect(
        `
      COUNT(
        DISTINCT CASE
          WHEN ar.id IS NOT NULL THEN ab.id
        END
      )
      `,
        'total_reviewed',
      )

      .groupBy('rw.id')
      .addGroupBy('u.id')

      .orderBy('rw.display_order', 'ASC')

      .getRawMany();
    return {
      status: 'success',
      statuscode: 200,
      data: reviewers,
      count: reviewers.length,
    };
  }

  async findOne(id: string) {
    const reviewer = await this.reviewerRepository.findOne({
      where: {
        id,
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
      .addSelect('COUNT(ar.id)', 'assign_count')
      .where('rw.is_active = true')
      .andWhere('u.id != :userId', { userId: user.id })
      .groupBy('rw.id')
      .addGroupBy('u.id')
      .orderBy('assign_count', 'ASC')
      .addOrderBy('rw.display_order', 'ASC')
      .limit(1);

    const { entities, raw } = await qb.getRawAndEntities();

    if (!entities.length) return null;

    return {
      ...entities[0],
      assignCount: Number(raw[0].assign_count),
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
          abstract: {
            status: true,
          },
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
      .addSelect('COUNT(ar.id)', 'assign_count')
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
      .orderBy('assign_count', 'ASC')
      .addOrderBy('rw.display_order', 'ASC')
      .limit(1);

    const { entities, raw } = await qb.getRawAndEntities();

    if (!entities.length) return null;

    return {
      ...entities[0],
      assignCount: Number(raw[0].assign_count),
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

    const activeAssignments = reviewer.abstractAssigns.filter(
      (assign) => assign.is_agreed !== false,
    );

    if (activeAssignments.length)
      throw new NotAcceptableException(
        `This reviewer has assigned ${activeAssignments.length} abstract(s).`,
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
  async seedReviewers(): Promise<string> {
    await Promise.all(
      REVIEWER_SEED_DATA.map((data) =>
        this.createSeed({
          user: {
            name: data.name,
            email: data.email,
          },
          display_order: data.display_order,
          is_active: true,
        }),
      ),
    );
    return 'Reviewers seeded successfully';
  }
}
