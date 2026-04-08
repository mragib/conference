import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { Topic } from './entities/topic.entity';

@Injectable()
export class TopicService {
  constructor(
    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>,
  ) {}
  async create(createTopicDto: CreateTopicDto) {
    try {
      const found = await this.topicRepository.findOne({
        where: { name: createTopicDto.name },
      });
      if (found)
        throw new ConflictException('Topic with this name already exists');
      const topic = await this.topicRepository.save(createTopicDto);
      return {
        message: 'Topic created successfully',
        data: topic,
        status: 'success',
        statusCode: 200,
      };
    } catch (error) {
      if (error instanceof ConflictException) throw error;
      throw new InternalServerErrorException('Failed to create topic');
    }
  }

  async findAll() {
    const [data, count] = await this.topicRepository.findAndCount({
      order: {
        created_at: 'ASC',
      },
    });
    return {
      data,
      count,
      status: 'success',
      statusCode: 200,
    };
  }

  findOne(id: string) {
    return this.topicRepository.findOne({ where: { id } });
  }

  update(id: string, updateTopicDto: UpdateTopicDto) {
    return `This action updates a #${id} topic`;
  }

  remove(id: string) {
    return `This action removes a #${id} topic`;
  }
}
