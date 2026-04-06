import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbstractModule } from 'src/abstract/abstract.module';
import { AbstractReviewController } from './abstract-review.controller';
import { AbstractReviewService } from './abstract-review.service';
import { AbstractReview } from './entities/abstract-review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AbstractReview]), AbstractModule],
  controllers: [AbstractReviewController],
  providers: [AbstractReviewService],
})
export class AbstractReviewModule {}
