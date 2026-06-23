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
import { AbstractService } from './abstract.service';
import { CreateAbstractDto } from './dto/create-abstract.dto';
import {
  UpdateAbstractDto,
  UpdateAbstractStatusDto,
} from './dto/update-abstract.dto';

@Controller('abstract')
export class AbstractController {
  constructor(private readonly abstractService: AbstractService) {}

  @Roles(
    Role.SUPERADMIN,
    Role.ADMIN,
    Role.AUTHORITY,
    Role.RESEARCHER,
    Role.REVIEWER,
  )
  @Post()
  create(@Body() createAbstractDto: CreateAbstractDto, @GetUser() user: User) {
    createAbstractDto.user = user;
    return this.abstractService.create(createAbstractDto);
  }

  @Roles(Role.RESEARCHER, Role.REVIEWER)
  @Get('author-abstracts')
  findAuthorAbstracts(@GetUser() user: User) {
    return this.abstractService.findAuthorAbstracts(user);
  }

  @Roles(Role.RESEARCHER, Role.REVIEWER)
  @Get('abstract-details-author/:id')
  async findAuthorAbstract(@Param('id') id: string, @GetUser() user: User) {
    const found = await this.abstractService.findAbstractDetailsForAuthor(
      id,
      user,
    );
    if (!found) throw new NotFoundException('Abstract is not found');
    return found;
  }

  @Roles(Role.REVIEWER)
  @Get('abstract-details-reviewer/:id')
  async findAbstractDetailsForReviewer(
    @Param('id') id: string,
    @GetUser() user: User,
  ) {
    const found = await this.abstractService.findAbstractDetailsForReviewer(
      id,
      user,
    );
    if (!found) throw new NotFoundException('Abstract is not found');
    return found;
  }

  @Roles(Role.SUPERADMIN, Role.ADMIN, Role.AUTHORITY)
  @Get('abstract-details-admin/:id')
  async findAbstractDetailsForAdmin(@Param('id') id: string) {
    const found = await this.abstractService.findAbstractDetailsForAdmin(id);
    if (!found) throw new NotFoundException('Abstract is not found');
    return found;
  }

  @Roles(Role.REVIEWER)
  @Get('reviewer-abstracts')
  findReviewerAbstracts(@GetUser() user: User) {
    return this.abstractService.findReviewerAbstracts(user);
  }

  @Roles(Role.SUPERADMIN, Role.ADMIN, Role.AUTHORITY)
  @Get()
  findAll() {
    return this.abstractService.findAll();
  }

  @Roles(Role.SUPERADMIN, Role.ADMIN, Role.AUTHORITY)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.abstractService.findOne(+id);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateAbstractStatusDto) {
    return this.abstractService.updateStatus(id, dto);
  }

  @Roles(Role.SUPERADMIN, Role.ADMIN, Role.AUTHORITY)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAbstractDto: UpdateAbstractDto,
  ) {
    return this.abstractService.update(id, updateAbstractDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.abstractService.remove(+id);
  }
}
