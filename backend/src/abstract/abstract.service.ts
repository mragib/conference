import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateAbstractDto } from './dto/create-abstract.dto';
import { UpdateAbstractDto } from './dto/update-abstract.dto';
import { Abstract } from './entities/abstract.entity';

@Injectable()
export class AbstractService {
  constructor(
    @InjectRepository(Abstract)
    private readonly abstractRepository: Repository<Abstract>,
  ) {}
  async create(createAbstractDto: CreateAbstractDto) {
    try {
      const abstract = await this.abstractRepository.save(createAbstractDto);
      return {
        message: 'Abstract created successfully',
        data: abstract,
        status: 'success',
        statusCode: 200,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    const [abstracts, count] = await this.abstractRepository.findAndCount();
    return {
      data: abstracts,
      count,
      status: 'success',
      statusCode: 200,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} abstract`;
  }

  update(id: number, updateAbstractDto: UpdateAbstractDto) {
    return `This action updates a #${id} abstract`;
  }

  remove(id: number) {
    return `This action removes a #${id} abstract`;
  }

  async findAuthorAbstracts(user: User) {
    const [abstracts, count] = await this.abstractRepository.findAndCount({
      where: {
        user: {
          id: user.id,
        },
      },
      relations: ['topic', 'co_authors'],
    });
    return { data: abstracts, count, status: 'success', statusCode: 200 };
  }

  async findReviewerAbstracts(user: User) {
    const abstracts = await this.abstractRepository
      .createQueryBuilder('abstract')
      .leftJoinAndSelect('abstract.topic', 'topic')
      .leftJoin('topic.user', 'reviewer')
      .where('reviewer.id = :userId', { userId: user.id })
      .getMany();

    return abstracts;
  }

  async findAbstractForReview(abstractId: string, user: User) {
    // ✅ 1. Verify reviewer has access to the abstract
    const abstract = await this.abstractRepository
      .createQueryBuilder('abstract')
      .leftJoin('abstract.topic', 'topic')
      .leftJoin('topic.user', 'reviewer')
      .where('abstract.id = :abstractId', { abstractId })
      .andWhere('reviewer.id = :userId', { userId: user.id })
      .getOne();

    return abstract;
  }
}
