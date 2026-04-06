import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/abstract/abstract.service';
import { Repository } from 'typeorm';
import { CreateAbstractReviewDto } from './dto/create-abstract-review.dto';
import { UpdateAbstractReviewDto } from './dto/update-abstract-review.dto';
import { AbstractReview } from './entities/abstract-review.entity';

@Injectable()
export class AbstractReviewService {
  constructor(
    @InjectRepository(AbstractReview)
    private readonly abstractReviewRepository: Repository<AbstractReview>,
    private readonly abstractService: AbstractService,
  ) {}
  async create(createAbstractReviewDto: CreateAbstractReviewDto) {
    try {
      const { user, abstractId } = createAbstractReviewDto;

      // ✅ 1. Check topic access
      // const abstract = await this.abstractRepository
      //   .createQueryBuilder('abstract')
      //   .leftJoin('abstract.topic', 'topic')
      //   .leftJoin('topic.user', 'reviewer')
      //   .where('abstract.id = :abstractId', { abstractId })
      //   .andWhere('reviewer.id = :userId', { userId: user.id })
      //   .getOne();

      const abstract = await this.abstractService.findAbstractForReview(
        abstractId,
        user,
      );

      if (!abstract) {
        throw new ForbiddenException(
          'You are not allowed to review this abstract',
        );
      }

      // ✅ 2. Prevent duplicate review
      const existingReview = await this.abstractReviewRepository.findOne({
        where: {
          user: { id: user.id },
          abstractId,
        },
      });

      if (existingReview) {
        throw new ConflictException('You have already reviewed this abstract');
      }

      // ✅ 3. Save review
      const abstractReview = await this.abstractReviewRepository.save(
        createAbstractReviewDto,
      );

      return {
        message: 'Abstract review created successfully',
        data: abstractReview,
        status: 'success',
        statusCode: 200,
      };
    } catch (error: any) {
      if (
        error instanceof ConflictException ||
        error instanceof ForbiddenException
      ) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Failed to create abstract review',
      );
    }
  }
  findAll() {
    return `This action returns all abstractReview`;
  }

  findOne(id: number) {
    return `This action returns a #${id} abstractReview`;
  }

  update(id: number, updateAbstractReviewDto: UpdateAbstractReviewDto) {
    return `This action updates a #${id} abstractReview`;
  }

  remove(id: number) {
    return `This action removes a #${id} abstractReview`;
  }
}
