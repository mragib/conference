import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DateSettingController } from './date-setting.controller';
import { DateSettingService } from './date-setting.service';
import { DateSetting } from './entities/date-setting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DateSetting])],
  controllers: [DateSettingController],
  providers: [DateSettingService],
  exports: [DateSettingService],
})
export class DateSettingModule {}
