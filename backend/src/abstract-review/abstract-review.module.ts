import { Module } from '@nestjs/common';
import { AbstractReviewService } from './abstract-review.service';
import { AbstractReviewController } from './abstract-review.controller';

@Module({
  controllers: [AbstractReviewController],
  providers: [AbstractReviewService],
})
export class AbstractReviewModule {}
