import { Body, Controller, Get, Post } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/role.decorators';
import { Role } from 'src/types/types';
import { DateSettingService } from './date-setting.service';
import { CreateDateSettingDto } from './dto/create-date-setting.dto';

@Controller('date-setting')
export class DateSettingController {
  constructor(private readonly dateSettingService: DateSettingService) {}

  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @Post()
  create(@Body() createDateSettingDto: CreateDateSettingDto) {
    return this.dateSettingService.create(createDateSettingDto);
  }

  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @Get('seed')
  seed() {
    return this.dateSettingService.seed();
  }
}
