import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractAssignService } from 'src/abstract-assign/abstract-assign.service';
import { ReviewerService } from 'src/reviewer/reviewer.service';
import { User } from 'src/user/entities/user.entity';
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
  ) {}
  async create(createAbstractDto: CreateAbstractDto) {
    try {
      const abstract = await this.abstractRepository.save(createAbstractDto);

      const user = abstract.user;

      const reviewer = await this.reviewService.findReviewerWithAsign(user);

      if (!reviewer)
        throw new InternalServerErrorException(
          'No active reviewers available for assignment',
        );

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

  async findAbstractDetails(id: string, user: User) {
    const abstract = await this.abstractRepository.findOne({
      where: {
        id,
        user: {
          id: user.id,
        },
      },
    });

    return abstract;
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
