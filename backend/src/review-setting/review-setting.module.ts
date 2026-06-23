import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewSetting } from './entities/review-setting.entity';
import { ReviewSettingController } from './review-setting.controller';
import { ReviewSettingService } from './review-setting.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewSetting])],
  controllers: [ReviewSettingController],
  providers: [ReviewSettingService],
})
export class ReviewSettingModule {}
