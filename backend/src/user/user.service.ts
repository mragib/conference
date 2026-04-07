import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'argon2';
import { ApiResponse, Role } from 'src/types/types';
import { IsNull, Repository } from 'typeorm';
import {
  ChangeRoleDto,
  CreateGoogleUserDto,
  CreateReviewerDto,
  CreateUserDto,
} from './dto/create-user.dto';
import { UpdateReviewerDto, UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = await this.findByEmail(createUserDto.email);
    if (user) {
      throw new ConflictException('User with this email already exists');
    }

    const { password } = createUserDto;
    const hashedPassword = await hash(password);

    createUserDto.password = hashedPassword;

    const newUser = await this.userRepository.save(createUserDto);

    return newUser;
  }

  async changeRole(changeRole: ChangeRoleDto): Promise<ApiResponse<User>> {
    const { userId } = changeRole;

    try {
      const user = await this.findOne(userId);

      if (!user) throw new NotFoundException('User is not found');

      const updatedUser = await this.userRepository.save({
        ...user,
        id: userId,
        role: changeRole.role,
      });

      return {
        status: 'success',
        statuscode: 200,
        data: updatedUser,
        message: 'User has been created',
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async createGoogleUser(createUserDto: CreateGoogleUserDto) {
    try {
      const user = await this.userRepository.save(createUserDto);

      return user;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Something went Wrong!');
    }
  }

  async updateRefreshToken(id: string, refreshToken: string | null) {
    try {
      const token = await this.userRepository.update(id, {
        refreshToken,
      });

      return token;
    } catch (error) {
      throw new InternalServerErrorException('Error on refresh token update');
    }
  }

  async findAll(): Promise<ApiResponse<User[]>> {
    const [user, count] = await this.userRepository.findAndCount();
    return {
      status: 'success',
      statuscode: 200,
      data: user,
      count,
    };
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({
      where: {
        email,
        deletedAt: IsNull(), // Explicitly check for null
      },
    });
  }

  // async findByPhone(phone: string) {
  //   return await this.userRepository.findOne({
  //     where: {
  //       phone,
  //       deletedAt: IsNull(), // Explicitly check for null
  //     },
  //   });
  // }

  findOne(id: string) {
    return this.userRepository.findOne({ where: { id, deletedAt: IsNull() } });
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<ApiResponse<User>> {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User is not found');
    }
    const updatedUser = await this.userRepository.save({
      id,
      ...updateUserDto,
    });

    return {
      status: 'success',
      statuscode: 200,
      data: updatedUser,
      message: 'User has been Updated',
    };
  }

  async remove(id: string) {
    await this.userRepository.softDelete(id);

    return {
      status: 'success',
      statuscode: 200,
      message: 'User has been Deleted',
    };
  }

  async makeReviewer(createReviewerDto: CreateReviewerDto) {
    const { email, name, topic } = createReviewerDto;
    try {
      const existingUser = await this.findByEmail(email);

      if (existingUser) {
        throw new ConflictException('User with this email already exists');
      }

      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const otp_expiry = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes

      const user = await this.userRepository.save({
        email,
        name,
        role: Role.REVIEWER,
        topic,
        otp,
        otp_expiry,
      });
      return {
        status: 'success',
        statuscode: 200,
        data: user,
        message: 'Reviewer has been created',
      };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException('Something went Wrong!');
    }
  }

  async updateReviewer(updateReviewerDto: UpdateReviewerDto) {
    const { email, name, topic } = updateReviewerDto;
    try {
      const user = await this.findByEmail(email);

      if (!user) {
        throw new NotFoundException('User with this email does not exist');
      }

      const updatedUser = await this.userRepository.save({
        ...user,
        name: name || user.name,
        topic: topic || user.topic,
      });

      return {
        status: 'success',
        statuscode: 200,
        data: updatedUser,
        message: 'Reviewer has been Updated',
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Something went Wrong!');
    }
  }
}
