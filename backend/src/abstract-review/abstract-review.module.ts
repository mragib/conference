import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbstractAssignModule } from 'src/abstract-assign/abstract-assign.module';
import { AbstractModule } from 'src/abstract/abstract.module';
import { MailModule } from 'src/mail/mail.module';
import { AbstractReviewController } from './abstract-review.controller';
import { AbstractReviewService } from './abstract-review.service';
import { AbstractReview } from './entities/abstract-review.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AbstractReview]),
    AbstractModule,
    AbstractAssignModule,
    MailModule,
  ],
  controllers: [AbstractReviewController],
  providers: [AbstractReviewService],
})
export class AbstractReviewModule {}
