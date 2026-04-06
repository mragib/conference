import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { Roles } from 'src/auth/decorators/role.decorators';
import { Role } from 'src/types/types';
import { User } from 'src/user/entities/user.entity';
import { AbstractService } from './abstract.service';
import { CreateAbstractDto } from './dto/create-abstract.dto';
import { UpdateAbstractDto } from './dto/update-abstract.dto';

@Controller('abstract')
export class AbstractController {
  constructor(private readonly abstractService: AbstractService) {}

  @Roles(Role.SUPERADMIN, Role.ADMIN, Role.AUTHORITY, Role.RESEARCHER)
  @Post()
  create(@Body() createAbstractDto: CreateAbstractDto, @GetUser() user: User) {
    createAbstractDto.user = user;
    return this.abstractService.create(createAbstractDto);
  }

  @Roles(Role.RESEARCHER)
  @Get('author-abstracts')
  findAuthorAbstracts(@GetUser() user: User) {
    return this.abstractService.findAuthorAbstracts(user);
  }

  @Roles(Role.REVIEWER)
  @Get('reviewer-abstracts')
  findReviewerAbstracts(@GetUser() user: User) {
    return this.abstractService.findReviewerAbstracts(user);
  }

  @Get()
  findAll() {
    return this.abstractService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.abstractService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAbstractDto: UpdateAbstractDto,
  ) {
    return this.abstractService.update(+id, updateAbstractDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.abstractService.remove(+id);
  }
}
