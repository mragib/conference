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
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    // const [abstracts, count] = await this.abstractRepository.findAndCount({
    //   select: {
    //     id: true,
    //     title: true,
    //     topic: {
    //       name: true,
    //     },
    //     status: {
    //       name: true,
    //     },
    //     co_authors: true,
    //     assigns: {
    //       reviewer: {
    //         user: {
    //           name: true,
    //           email: true,
    //         },
    //       },
    //     },
    //   },
    //   relations: {
    //     status: true,
    //     topic: true,
    //     co_authors: true,
    //     abstract_review: true,
    //     assigns: {
    //       reviewer: {
    //         user: true,
    //       },
    //     },
    //   },
    // });
    const [abstracts, count] = await this.abstractRepository
      .createQueryBuilder('a')

      // ✅ joins
      .leftJoin('a.topic', 't')
      .leftJoin('a.status', 's')
      .leftJoin('a.co_authors', 'ca')
      .leftJoin('a.assigns', 'as')
      .leftJoin('as.reviewer', 'r')
      .leftJoin('r.user', 'u')

      // ✅ select only what you need
      .select([
        'a.id',
        'a.title',

        't.name',
        's.name',

        'ca', // full co_authors (or pick fields if needed)

        'as.id', // important: include at least PK
        'r.id',
        'u.name',
        'u.email',
      ])

      .getManyAndCount();

    const formatted = abstracts.map((a) => ({
      ...a,

      reviewers: a.assigns?.map((as) => ({
        name: as.reviewer?.user?.name,
        email: as.reviewer?.user?.email,
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
      relations: ['topic', 'co_authors'],
      order: {
        created_at: 'DESC',
      },
    });
    return { data: abstracts, count, status: 'success', statusCode: 200 };
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
