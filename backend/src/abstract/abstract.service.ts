import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractAssignService } from 'src/abstract-assign/abstract-assign.service';
import { MailService } from 'src/mail/mail.service';
import { ReviewerService } from 'src/reviewer/reviewer.service';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateAbstractDto } from './dto/create-abstract.dto';
import { UpdateAbstractDto } from './dto/update-abstract.dto';
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

  update(id: number, updateAbstractDto: UpdateAbstractDto) {
    return `This action updates a #${id} abstract`;
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
      },
      relations: {
        co_authors: true,
        topic: true,
        status: true,
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
      .getMany();

    return abstracts;
  }

  async findAbstractForReview(abstractId: string, user: User) {
    // ✅ 1. Verify reviewer has access to the abstract
    const abstract = await this.abstractRepository
      .createQueryBuilder('abstract')
      .leftJoin('abstract.topic', 'topic')
      .leftJoin('topic.user', 'reviewer')
      .where('abstract.id = :abstractId', { abstractId })
      .andWhere('reviewer.id = :userId', { userId: user.id })
      .getOne();

    return abstract;
  }
}
