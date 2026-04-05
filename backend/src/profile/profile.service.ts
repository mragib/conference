import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async create(createProfileDto: CreateProfileDto, user: User) {
    try {
      const found = await this.findOne({ where: { user: { id: user.id } } });

      if (found)
        throw new ConflictException('Profile already exists for this user');

      const profile = await this.profileRepository.save({
        ...createProfileDto,
        created_by: user,
        user: user,
      });
      return {
        message: 'Profile created successfully',
        data: profile,
        statusCode: 200,
        status: 'success',
      };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to create profile');
    }
  }

  async findAll() {
    const [data, count] = await this.profileRepository.findAndCount();
    return {
      data: data,
      count: count,
      statusCode: 200,
      status: 'success',
    };
  }

  findOne(condition) {
    return this.profileRepository.findOne(condition);
  }

  async profile(user: User) {
    const found = await this.findOne({ where: { user: { id: user.id } } });
    if (!found) throw new ConflictException('Profile not found for this user');
    return {
      message: 'Profile found successfully',
      data: found,
      statusCode: 200,
      status: 'success',
    };
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
