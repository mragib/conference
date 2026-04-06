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
import { AbstractReviewService } from './abstract-review.service';
import { CreateAbstractReviewDto } from './dto/create-abstract-review.dto';
import { UpdateAbstractReviewDto } from './dto/update-abstract-review.dto';

@Controller('abstract-review')
export class AbstractReviewController {
  constructor(private readonly abstractReviewService: AbstractReviewService) {}

  @Roles(Role.REVIEWER)
  @Post()
  create(
    @Body() createAbstractReviewDto: CreateAbstractReviewDto,
    @GetUser() user: User,
  ) {
    createAbstractReviewDto.user = user;
    return this.abstractReviewService.create(createAbstractReviewDto);
  }

  @Get()
  findAll() {
    return this.abstractReviewService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.abstractReviewService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAbstractReviewDto: UpdateAbstractReviewDto,
  ) {
    return this.abstractReviewService.update(+id, updateAbstractReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.abstractReviewService.remove(+id);
  }
}
