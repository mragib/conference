import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import { MailService } from 'src/mail/mail.service';
import { ReviewerService } from 'src/reviewer/reviewer.service';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateAbstractAssignDto } from './dto/create-abstract-assign.dto';
import { AbstractAssign } from './entities/abstract-assign.entity';

@Injectable()
export class AbstractAssignService {
  constructor(
    @InjectRepository(AbstractAssign)
    private readonly abstractAssignRepository: Repository<AbstractAssign>,
    private readonly reviewerService: ReviewerService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
  ) {}

  async create(createAbstractAssignDto: CreateAbstractAssignDto) {
    try {
      const rawToken_agree = crypto.randomBytes(32).toString('hex');
      const agree_token = crypto
        .createHash('sha256')
        .update(rawToken_agree)
        .digest('hex');

      const rawToken_disagree = crypto.randomBytes(32).toString('hex');
      const disagree_token = crypto
        .createHash('sha256')
        .update(rawToken_disagree)
        .digest('hex');

      const invite_expiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h

      createAbstractAssignDto.agree_token = agree_token;
      createAbstractAssignDto.disagree_token = disagree_token;
      createAbstractAssignDto.token_expiry = invite_expiry;

      const abstractAssign = await this.abstractAssignRepository.save(
        createAbstractAssignDto,
      );

      const FRONTEND_URL = this.configService.get<string>('FRONTEND_URL');
      try {
        await this.mailService.sendEmail(
          createAbstractAssignDto.reviewer.user.email,
          'SCM Conference Abstract Assignment',
          'abstract-assign-email',
          {
            name: createAbstractAssignDto.reviewer?.user.name,
            abstract_title: createAbstractAssignDto.abstract.title,
            agree_link: `${FRONTEND_URL}/reviewer/agree?token=${rawToken_agree}`,
            disagree_link: `${FRONTEND_URL}/reviewer/disagree?token=${rawToken_disagree}`,
          },
        );

        return {
          message: 'Abstract Assignment created successfully',
          data: abstractAssign,
          status: 'success',
          statusCode: 200,
        };
      } catch (error: any) {
        return {
          message: 'Failed to create abstract assignment',
          error: error.message,
          status: 'error',
          statusCode: 500,
        };
      }
    } catch (error: any) {
      return {
        message: 'Failed to create abstract assignment',
        error: error.message,
        status: 'error',
        statusCode: 500,
      };
    }
  }

  async findAll(): Promise<AbstractAssign[]> {
    return this.abstractAssignRepository.find({
      relations: ['abstract', 'reviewer'],
    });
  }

  async handleAgree(token: string, user: User) {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const assignment = await this.abstractAssignRepository
      .createQueryBuilder('assign')
      .leftJoinAndSelect('assign.reviewer', 'reviewer')
      .where('assign.agree_token = :token', { token: hashedToken })
      .andWhere('reviewer.userId = :userId', { userId: user.id })
      .getOne();

    if (!assignment) {
      throw new NotFoundException('Assignment not found or not authorized');
    }

    if (assignment.token_expiry < new Date()) {
      throw new BadRequestException('Token expired');
    }

    assignment.is_agreed = true;
    assignment.acknowledge_date = new Date();
    assignment.agree_token = null;
    assignment.disagree_token = null;

    await this.abstractAssignRepository.save(assignment);

    return { message: 'You have agreed successfully' };
  }

  async handleDisagree(token: string, user: User) {
    try {
      const hashedToken = crypto
        .createHash('sha256')
        .update(token)
        .digest('hex');

      const assignment = await this.abstractAssignRepository
        .createQueryBuilder('assign')
        .leftJoinAndSelect('assign.reviewer', 'reviewer')
        .leftJoinAndSelect('assign.abstract', 'abstract')
        .where('assign.disagree_token = :token', { token: hashedToken })
        .andWhere('reviewer.userId = :userId', { userId: user.id })
        .getOne();

      if (!assignment) {
        throw new NotFoundException('Assignment not found or not authorized');
      }

      if (assignment.token_expiry < new Date()) {
        throw new BadRequestException('Token expired');
      }

      assignment.is_agreed = false;
      assignment.acknowledge_date = new Date();
      assignment.agree_token = null;
      assignment.disagree_token = null;

      const savedAssignment =
        await this.abstractAssignRepository.save(assignment);

      const newReviewer =
        await this.reviewerService.findNextReviewerForReassign(
          savedAssignment.abstractId,
        );

      if (!newReviewer) {
        throw new BadRequestException(
          'No eligible reviewer found for reassignment',
        );
      }

      const newAssign = this.create({
        reviewer: newReviewer,
        abstract: assignment.abstract,
        assign_date: new Date(),
      });

      return { message: 'You have disagreed successfully', success: true };
    } catch (error) {
      console.error(error);
    }
  }
}
