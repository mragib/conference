import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { Roles } from 'src/auth/decorators/role.decorators';
import { Role } from 'src/types/types';
import { User } from 'src/user/entities/user.entity';
import { CreateReviewerDto } from './dto/create-reviewer.dto';
import { UpdateReviewerDto } from './dto/update-reviewer.dto';
import { ReviewerService } from './reviewer.service';

@Controller('reviewer')
export class ReviewerController {
  constructor(private readonly reviewerService: ReviewerService) {}

  @Roles(Role.SUPERADMIN, Role.ADMIN, Role.AUTHORITY)
  @Post()
  create(@Body() createReviewerDto: CreateReviewerDto) {
    return this.reviewerService.create(createReviewerDto);
  }

  @Roles(Role.ADMIN)
  @Get('seed')
  seedReviewers() {
    return this.reviewerService.seedReviewers();
  }

  @Roles(Role.SUPERADMIN, Role.ADMIN, Role.AUTHORITY)
  @Patch('change-status/:id')
  async changeReviewerStatus(
    @Body() updateReviewerDto: UpdateReviewerDto,
    @Param('id') id: string,
  ) {
    const found = await this.reviewerService.findOne(id);
    if (!found) throw new NotFoundException('Reviewer is not found');
    return this.reviewerService.changeReviewerStatus(id, updateReviewerDto);
  }

  @Roles(Role.REVIEWER)
  @Get('abstracts')
  async findAbstract(@GetUser() user: User) {
    return this.reviewerService.findAbstract(user);
  }

  @Roles(Role.SUPERADMIN, Role.ADMIN, Role.AUTHORITY)
  @Get()
  findAll() {
    return this.reviewerService.findAll();
  }

  @Roles(Role.SUPERADMIN, Role.ADMIN, Role.AUTHORITY)
  @Get('stats')
  findAllWithStats() {
    return this.reviewerService.findAllReviewerWithStats();
  }

  @Roles(Role.SUPERADMIN, Role.ADMIN, Role.AUTHORITY)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewerService.findOne(id);
  }

  @Roles(Role.SUPERADMIN, Role.ADMIN, Role.AUTHORITY)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReviewerDto: UpdateReviewerDto,
  ) {
    return this.reviewerService.update(+id, updateReviewerDto);
  }
  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewerService.remove(+id);
  }
}
