import { Module } from '@nestjs/common';
import { DateSettingService } from './date-setting.service';
import { DateSettingController } from './date-setting.controller';

@Module({
  controllers: [DateSettingController],
  providers: [DateSettingService],
})
export class DateSettingModule {}
