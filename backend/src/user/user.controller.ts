import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/role.decorators';
import { Role } from 'src/types/types';
import {
  ChangeRoleDto,
  CreateUserDto,
  CreateUserForAdminDto,
} from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @Get('with-topic')
  findAllWithTopic() {
    return this.userService.findAllUserWithTopic();
  }

  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @Post('change-role')
  updateRole(@Body() changeRole: ChangeRoleDto) {
    return this.userService.changeRole(changeRole);
  }

  @Roles(Role.SUPERADMIN, Role.ADMIN, Role.AUTHORITY)
  @Post('create-user')
  createUser(@Body() createReviewerDto: CreateUserForAdminDto) {
    return this.userService.createUserForAdmin(createReviewerDto);
  }

  @Roles(Role.SUPERADMIN, Role.ADMIN, Role.AUTHORITY)
  @Patch('update-user/:id')
  updateReviewer(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }
}
