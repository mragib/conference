import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractAssignService } from 'src/abstract-assign/abstract-assign.service';
import { MailService } from 'src/mail/mail.service';
import { ReviewerService } from 'src/reviewer/reviewer.service';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateAbstractDto } from './dto/create-abstract.dto';
import {
  UpdateAbstractDto,
  UpdateAbstractStatusDto,
} from './dto/update-abstract.dto';
import { Abstract } from './entities/abstract.entity';

@Injectable()
export class AbstractService {
  constructor(
    @InjectRepository(Abstract)
    private readonly abstractRepository: Repository<Abstract>,
    private readonly reviewService: ReviewerService,
    private readonly abstractAssignService: AbstractAssignService,
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}
  async create(createAbstractDto: CreateAbstractDto) {
    try {
      const abstract = await this.abstractRepository.save(createAbstractDto);

      const user = abstract.user;

      const userFromDb = await this.userService.findById(user.id);

      if (!userFromDb) {
        throw new InternalServerErrorException('User not found');
      }

      const reviewer = await this.reviewService.findReviewerWithAsign(user);

      if (!reviewer) {
        console.error('No active reviewers available for assignment');
      }

      try {
        const ADMIN_EMAIL = this.configService.get<string>('ADMIN_EMAIL')!;

        await this.mailService.sendEmail(
          userFromDb.email,
          'SCM Conference Abstract Submission Confirmation',
          'abstract-submission-confirm-user-email',
          {
            authorName: userFromDb.name,
          },
        );

        await this.mailService.sendEmail(
          ADMIN_EMAIL,
          'SCM Conference Abstract Submission Confirmation',
          'abstract-submission-confirm-admin',
          {
            authorName: user.name,
            abstractTitle: abstract.title,
            reviewerName: reviewer?.user.name || 'No reviewer assigned',
          },
        );
        if (!reviewer) {
          return {
            message: 'Abstract created successfully',
            // data: abstract,
            status: 'success',
            statusCode: 200,
          };
        }

        const abstractAssigns = await this.abstractAssignService.create({
          abstract,
          reviewer,
          assign_date: new Date(),
        });

        return {
          message: 'Abstract created successfully',
          // data: abstract,
          status: 'success',
          statusCode: 200,
        };
      } catch (error) {
        console.error('Failed to send assignment email:', error);
      }
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    const [abstracts, count] = await this.abstractRepository
      .createQueryBuilder('a')
      .leftJoin('a.topic', 't')
      .leftJoin('a.status', 's')
      .leftJoin('a.co_authors', 'ca')
      .leftJoin('a.assigns', 'as')
      .leftJoin('as.reviewer', 'r')
      .leftJoin('r.user', 'u')
      .leftJoin('a.abstract_review', 'ar')
      .select([
        'a.id',
        'a.title',

        't.name',
        's.name',

        'ca',

        'as.id',
        'as.is_agreed',

        'r.id',

        'u.name',
        'u.email',

        'ar.id',
      ])
      .getManyAndCount();

    const formatted = abstracts.map((a) => ({
      id: a.id,
      title: a.title,

      topic: { name: a.topic?.name },

      status: { name: a.status?.name },

      has_review: !!a.abstract_review,
      co_authors: a.co_authors
        .sort((a, b) => a.display_order - b.display_order)
        .map((item) => {
          return {
            first_name: item.first_name,
            last_name: item.last_name,
            email: item.email,
          };
        }),

      reviewers: a.assigns
        ?.sort((a, b) => {
          const priority = (value: boolean | null | undefined) => {
            if (value === true) return 0;
            if (value == null) return 1;
            return 2;
          };

          return priority(a.is_agreed) - priority(b.is_agreed);
        })
        .map((as) => ({
          name: as.reviewer?.user?.name,
          email: as.reviewer?.user?.email,
          is_agreed: as.is_agreed,
        })),
    }));

    return {
      data: formatted,
      count,
      status: 'success',
      statusCode: 200,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} abstract`;
  }

  update(id: string, updateAbstractDto: UpdateAbstractDto) {
    return this.abstractRepository.update(id, updateAbstractDto);
  }

  remove(id: number) {
    return `This action removes a #${id} abstract`;
  }

  async findAuthorAbstracts(user: User) {
    const [abstracts, count] = await this.abstractRepository.findAndCount({
      where: {
        user: {
          id: user.id,
        },
      },
      relations: {
        co_authors: true,
        status: true,
        topic: true,
      },
      select: {
        id: true,
        title: true,
        created_at: true,
      },
      order: {
        created_at: 'DESC',
      },
    });
    return { data: abstracts, count, status: 'success', statusCode: 200 };
  }

  async findAbstractDetailsForAuthor(id: string, user: User) {
    const abstract = await this.abstractRepository.findOne({
      where: {
        id,
        user: {
          id: user.id,
        },
      },
      select: {
        id: true,
        title: true,
        purpose: true,
        methodology: true,
        findings: true,
        theoretical: true,
        practical: true,
        references: true,
        keyword: true,
        created_at: true,
        status: {
          id: true,
          name: true,
        },
        topic: {
          id: true,
          name: true,
        },
        co_authors: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
          organization: true,
          display_order: true,
        },
        abstract_review: {
          comment_to_author: true,
        },
      },
      relations: {
        co_authors: true,
        topic: true,
        status: true,
        abstract_review: true,
      },
      order: {
        created_at: 'DESC',
      },
    });

    return abstract;
  }

  async findAbstractDetailsForAdmin(id: string) {
    const result = await this.abstractRepository
      .createQueryBuilder('abstract')
      .leftJoinAndSelect('abstract.co_authors', 'co_authors')
      .leftJoinAndSelect('abstract.topic', 'topic')
      .leftJoinAndSelect('abstract.status', 'status')
      .leftJoinAndSelect('abstract.abstract_review', 'abstractReview')
      .innerJoin('abstract.assigns', 'assigns')
      .innerJoin('assigns.reviewer', 'reviewer')
      .innerJoin('reviewer.user', 'reviewerUser')
      .where('abstract.id = :abstractId', { abstractId: id })
      .getOne();

    return result;
  }

  async findAbstractDetailsForReviewer(id: string, user: User) {
    const result = await this.abstractRepository
      .createQueryBuilder('abstract')
      .leftJoinAndSelect('abstract.co_authors', 'co_authors')
      .leftJoinAndSelect('abstract.topic', 'topic')
      .leftJoinAndSelect('abstract.status', 'status')
      .leftJoinAndSelect('abstract.abstract_review', 'abstractReview')
      .innerJoin('abstract.assigns', 'assigns')
      .innerJoin('assigns.reviewer', 'reviewer')
      .innerJoin('reviewer.user', 'reviewerUser')
      .where('abstract.id = :abstractId', { abstractId: id })
      .andWhere('reviewerUser.id = :userId', { userId: user.id })
      .andWhere('assigns.is_agreed = :isAgreed', { isAgreed: true })
      .getOne();

    return result;
  }

  async findReviewerAbstracts(user: User) {
    const abstracts = await this.abstractRepository
      .createQueryBuilder('abstract')
      .leftJoinAndSelect('abstract.topic', 'topic')
      .leftJoin('topic.user', 'reviewer')
      .where('reviewer.id = :userId', { userId: user.id })
      .orderBy('abstract.created_at', 'DESC')
      .getMany();

    return abstracts;
  }

  async updateStatus(id: string, dto: UpdateAbstractStatusDto) {
    const abstract = await this.abstractRepository.findOne({
      where: { id },
      relations: ['status', 'user'],
    });

    if (!abstract) {
      throw new NotFoundException('Abstract not found');
    }

    abstract.statusId = dto.statusId;

    const updated = await this.abstractRepository.update(id, {
      statusId: dto.statusId,
    });

    const accepted = dto.statusId === 2;

    await this.mailService.sendEmail(
      abstract.user.email,
      accepted
        ? 'SCM Conference 2026 - Abstract Acceptance Notification'
        : 'SCM Conference 2026 - Abstract Review Decision',
      accepted
        ? 'abstract-accepted-user-email'
        : 'abstract-rejected-user-email',
      {
        name: abstract.user.name,
        title: abstract.title,
      },
    );

    return updated;
  }

  async findAuthorDashboardStats(user: User) {
    const abstractStats = await this.abstractRepository
      .createQueryBuilder('abstract')
      .leftJoin('abstract.status', 'status')
      .select('COUNT(abstract.id)', 'total')
      .addSelect(
        `SUM(CASE WHEN status.name = 'accepted' THEN 1 ELSE 0 END)`,
        'accepted',
      )
      .addSelect(
        `SUM(CASE WHEN status.name = 'pending' THEN 1 ELSE 0 END)`,
        'pending',
      )
      .addSelect(
        `SUM(CASE WHEN status.name = 'rejected' THEN 1 ELSE 0 END)`,
        'rejected',
      )
      .addSelect(
        `SUM(CASE WHEN status.name = 'reviewed' THEN 1 ELSE 0 END)`,
        'reviewed',
      )
      .addSelect(
        `SUM(CASE WHEN status.name = 'saved' THEN 1 ELSE 0 END)`,
        'saved',
      )
      .where('abstract.userId = :userId', {
        userId: user.id,
      })
      .getRawOne();
    return abstractStats;
  }

  async findAdminDashboardStats() {
    const stats = await this.abstractRepository
      .createQueryBuilder('ab')
      .select('COUNT(ab.id)', 'total')
      .addSelect(
        `
      COUNT(
        CASE WHEN ab.statusId = 2 THEN 1 END
      )
      `,
        'accepted',
      )
      .addSelect(
        `
      COUNT(
        CASE WHEN ab.statusId = 1 THEN 1 END
      )
      `,
        'pending',
      )
      .addSelect(
        `
      COUNT(
        CASE WHEN ab.statusId = 3 THEN 1 END
      )
      `,
        'rejected',
      )
      .addSelect(
        `
      COUNT(
        CASE WHEN ab.statusId = 4 THEN 1 END
      )
      `,
        'reviewed',
      )
      .addSelect(
        `
      COUNT(
        CASE WHEN ab.statusId = 5 THEN 1 END
      )
      `,
        'saved',
      )
      .getRawOne();

    return stats;
  }
}
