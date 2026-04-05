import {
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubThemeDto } from './dto/create-sub-theme.dto';
import { UpdateSubThemeDto } from './dto/update-sub-theme.dto';
import { SubTheme } from './entities/sub-theme.entity';

@Injectable()
export class SubThemeService {
  constructor(
    @InjectRepository(SubTheme)
    private readonly subthemeRepository: Repository<SubTheme>,
  ) {}
  async create(createSubThemeDto: CreateSubThemeDto) {
    try {
      const { name } = createSubThemeDto;
      const found = await this.subthemeRepository.findOneBy({ name });

      if (found) {
        throw new ConflictException('This sub theme already exist');
      }

      const subtheme = await this.subthemeRepository.save(createSubThemeDto);

      return {
        status: 'success',
        statuscode: 200,
        data: subtheme,
        message: 'Sub theme has been created',
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Something went wrong!🔥');
    }
  }

  async findAll() {
    const [subthemes, count] = await this.subthemeRepository.findAndCount();

    return {
      data: subthemes,
      count,
      status: 'success',
      statusCode: 200,
    };
  }

  findOne(id: string) {
    return this.subthemeRepository.findOneBy({ id });
  }

  async update(id: string, updateSubThemeDto: UpdateSubThemeDto) {
    try {
      const existing = await this.subthemeRepository.findOneBy({ id });

      if (!existing) {
        throw new NotFoundException('Sub theme not found');
      }

      const updated = await this.subthemeRepository.save({
        ...existing,
        ...updateSubThemeDto,
      });

      return {
        status: 'success',
        statuscode: 200,
        data: updated,
        message: 'Sub theme updated successfully',
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Something went wrong!🔥');
    }
  }
  async remove(id: string) {
    try {
      const result = await this.subthemeRepository.delete(id);

      if (result.affected === 0) {
        throw new NotFoundException('Sub theme not found');
      }

      return {
        status: 'success',
        statuscode: 200,
        message: 'Sub theme deleted successfully',
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Something went wrong!🔥');
    }
  }
}
