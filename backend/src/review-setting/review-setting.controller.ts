import { Controller, Get } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/role.decorators';
import { Role } from 'src/types/types';
import { ReviewSettingService } from './review-setting.service';

@Controller('review-setting')
export class ReviewSettingController {
  constructor(private readonly reviewSettingService: ReviewSettingService) {}

  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @Get('seed')
  seed() {
    return this.reviewSettingService.seed();
  }

  @Get()
  findAll() {
    return this.reviewSettingService.findAll();
  }
}
