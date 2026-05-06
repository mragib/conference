import { Controller, Get, Query } from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { Roles } from 'src/auth/decorators/role.decorators';
import { Role } from 'src/types/types';
import { User } from 'src/user/entities/user.entity';
import { AbstractAssignService } from './abstract-assign.service';

@Controller('abstract-assign')
export class AbstractAssignController {
  constructor(private readonly abstractAssignService: AbstractAssignService) {}

  @Roles(Role.SUPERADMIN, Role.ADMIN, Role.AUTHORITY)
  @Get()
  async findAll() {
    return this.abstractAssignService.findAll();
  }

  @Roles(Role.SUPERADMIN, Role.ADMIN, Role.AUTHORITY, Role.REVIEWER)
  @Get('agree')
  async agree(@Query('token') token: string, @GetUser() user: User) {
    return this.abstractAssignService.handleAgree(token, user);
  }

  @Roles(Role.SUPERADMIN, Role.ADMIN, Role.AUTHORITY, Role.REVIEWER)
  @Get('disagree')
  async disagree(@Query('token') token: string, @GetUser() user: User) {
    return this.abstractAssignService.handleDisagree(token, user);
  }
}
