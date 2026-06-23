import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractAssignService } from 'src/abstract-assign/abstract-assign.service';
import { AbstractService } from 'src/abstract/abstract.service';
import { MailService } from 'src/mail/mail.service';
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
    private readonly abstractAssignService: AbstractAssignService,
    private readonly mailService: MailService,
  ) {}
  async create(createAbstractReviewDto: CreateAbstractReviewDto) {
    try {
      const { created_by, abstractId } = createAbstractReviewDto;

      const abstract = await this.abstractAssignService.findAbstractForReview(
        abstractId,
        created_by,
      );

      if (!abstract) {
        throw new ForbiddenException(
          'You are not allowed to review this abstract',
        );
      }

      // ✅ 2. Prevent duplicate review
      const existingReview = await this.abstractReviewRepository.findOne({
        where: {
          created_by: { id: created_by.id },
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

      // Change Status
      abstract.statusId = 4;
      const updateAbstract = await this.abstractService.update(
        abstract.id,
        abstract,
      );

      return {
        message: 'Abstract review created successfully',
        data: abstractReview,
        status: 'success',
        statusCode: 200,
      };
    } catch (error: any) {
      console.error(error);
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
