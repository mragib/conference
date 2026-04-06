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
import { Public } from 'src/auth/decorators/public.decorators';
import { Roles } from 'src/auth/decorators/role.decorators';
import { Role } from 'src/types/types';
import { User } from 'src/user/entities/user.entity';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { TopicService } from './topic.service';

@Controller('topic')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @Post()
  create(@Body() createTopicDto: CreateTopicDto, @GetUser() user: User) {
    createTopicDto.created_by = user;
    return this.topicService.create(createTopicDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.topicService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const found = await this.topicService.findOne(id);
    if (!found) throw new NotFoundException('Topic not found');
    return found;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTopicDto: UpdateTopicDto) {
    return this.topicService.update(id, updateTopicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.topicService.remove(id);
  }
}
