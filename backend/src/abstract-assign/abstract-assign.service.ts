import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import { MailService } from 'src/mail/mail.service';
import { ReviewerService } from 'src/reviewer/reviewer.service';
import { User } from 'src/user/entities/user.entity';
import { Not, Repository } from 'typeorm';
import {
  ChangeReviewerDto,
  CreateAbstractAssignDto,
} from './dto/create-abstract-assign.dto';
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

      const newabstractAssign = await this.abstractAssignRepository.findOne({
        where: {
          id: abstractAssign.id,
        },
        relations: {
          abstract: true,
          reviewer: {
            user: true,
          },
        },
      });

      if (!newabstractAssign)
        throw new NotFoundException('Abstract assign is not found');

      const FRONTEND_URL = this.configService.get<string>('FRONTEND_URL');
      try {
        await this.mailService.sendEmail(
          newabstractAssign.reviewer.user.email,
          'SCM Conference Abstract Assignment',
          'abstract-assign-email',
          {
            name: newabstractAssign.reviewer?.user.name,
            reviewDeadline: this.configService.get<string>('REVIEW_DEADLINE'),
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

  async handleAcknowledgement(id: string, acknowledge: boolean, user: User) {
    const abstractAssign = await this.abstractAssignRepository.findOne({
      where: {
        id,
        reviewer: {
          user: {
            id: user.id,
          },
        },
      },
      relations: {
        reviewer: {
          user: true,
        },
      },
    });

    if (!abstractAssign) {
      throw new NotFoundException('Abstract assignment not found');
    }

    abstractAssign.acknowledge_date = new Date();
    abstractAssign.is_agreed = acknowledge;
    abstractAssign.agree_token = null;
    abstractAssign.disagree_token = null;

    const updated = await this.abstractAssignRepository.save(abstractAssign);

    return {
      status: 'success',
      data: updated,
      statusCode: 200,
      message: `You ${acknowledge ? 'agree' : 'decline'} this abstract to review.`,
    };
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

      const newAssign = await this.create({
        reviewer: newReviewer,
        abstract: assignment.abstract,
        assign_date: new Date(),
      });

      return { message: 'You have disagreed successfully', success: true };
    } catch (error) {
      console.error(error);
    }
  }

  async changeReviewer(changeReviewerDto: ChangeReviewerDto) {
    const { abstract, reviewer } = changeReviewerDto;
    try {
      await this.abstractAssignRepository.update(
        {
          abstract: {
            id: abstract.id,
          },
          reviewer: {
            id: Not(reviewer.id),
          },
        },
        {
          is_agreed: false,
        },
      );

      const newAssign = await this.create({
        abstract,
        reviewer,
        assign_date: new Date(),
      });

      return newAssign;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Something went wrong!!!');
    }
  }
}
