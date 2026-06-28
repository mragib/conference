import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'argon2';
import * as crypto from 'crypto';
import { MailService } from 'src/mail/mail.service';
import { ApiResponse, Role } from 'src/types/types';
import { FindOneOptions, In, IsNull, Not, Repository } from 'typeorm';
import {
  ChangeRoleDto,
  CreateGoogleUserDto,
  CreateUserDto,
  CreateUserForAdminDto,
} from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private mailService: MailService,
    private readonly configService: ConfigService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = await this.findByEmail(createUserDto.email);

    if (user) {
      throw new ConflictException('User with this email already exists');
    }

    const { password } = createUserDto;
    const hashedPassword = await hash(password);

    createUserDto.password = hashedPassword;
    createUserDto.is_active = true;

    const newUser = await this.userRepository.save(createUserDto);

    return {
      status: 'success',
      statusCode: 200,
      data: newUser,
      message: 'User Registration Complete',
    };
  }

  async changeRole(changeRole: ChangeRoleDto): Promise<ApiResponse<User>> {
    const { userId } = changeRole;

    try {
      const user = await this.findById(userId);

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
        message: `${updatedUser.name} is changed to ${updatedUser.role} role`,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async createGoogleUser(createUserDto: CreateGoogleUserDto) {
    try {
      createUserDto.is_active = true;
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
    const [user, count] = await this.userRepository.findAndCount({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        is_active: true,
        profile: {
          country: true,
          designation: true,
          contact_number: true,
          organization: true,
        },
      },
      relations: ['profile'],
      where: {
        role: Not(In([Role.SUPERADMIN])),
      },
    });
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
        is_active: true,
        deletedAt: IsNull(), // Explicitly check for null
      },
    });
  }

  async findUserForGoogle(email: string) {
    return await this.userRepository.findOne({
      where: {
        email,
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

  findOne(condition: FindOneOptions<User>): Promise<User | null> {
    return this.userRepository.findOne(condition);
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<ApiResponse<User>> {
    const user = await this.findById(id);

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

  async createUserForAdmin(createUserDto: CreateUserForAdminDto) {
    const { email, name, role, is_active } = createUserDto;
    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }
    const rawToken = crypto.randomBytes(32).toString('hex');
    const invite_token = crypto
      .createHash('sha256')
      .update(rawToken)
      .digest('hex');
    const invite_expiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h
    const user = await this.userRepository.save({
      email,
      name,
      role,
      invite_token,
      invite_expiry,
      is_active,
    });
    const FRONTEND_URL = this.configService.get<string>('FRONTEND_URL');
    try {
      await this.mailService.sendEmail(
        user.email,
        'SCM Conference User Registration',
        'create-user-email',
        {
          name,
          role,
          link: `${FRONTEND_URL}/set-password?token=${rawToken}`,
        },
      );
      return {
        status: 'success',
        statuscode: 200,
        data: user,
        message: 'User has been created',
      };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      await this.userRepository.delete(user.id);
      throw new InternalServerErrorException('Something went Wrong!');
    }
  }

  async findAllUserWithTopic() {
    const [user, count] = await this.userRepository.findAndCount({
      where: {
        role: Not(In([Role.ADMIN, Role.SUPERADMIN])),
      },
      relations: ['topic'],
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
    return {
      status: 'success',
      statuscode: 200,
      data: user,
      count,
    };
  }

  async findByResetToken(resetToken: string) {
    return await this.userRepository.findOne({
      where: {
        reset_token: resetToken,
        deletedAt: IsNull(),
      },
    });
  }

  async findById(id: string) {
    return await this.userRepository.findOne({
      where: {
        id,
        deletedAt: IsNull(),
      },
    });
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) throw new NotFoundException('User is not found');

    const { email, ...rest } = updateUserDto;

    const updatedUser = await this.userRepository.update(id, rest);

    return {
      data: updatedUser,
      status: 'success',
      statusCode: 200,
      message: 'User updated successfully',
    };
  }
  async findAdminDashboardStats() {
    const stats = await this.userRepository
      .createQueryBuilder('u')
      .select('COUNT(u.id)', 'total')
      .addSelect(
        `
      COUNT(
        CASE
          WHEN u.role = 'RESEARCHER'
          THEN 1
        END
      )
      `,
        'researchers',
      )
      .addSelect(
        `
      COUNT(
        CASE
          WHEN u.role = 'REVIEWER'
          THEN 1
        END
      )
      `,
        'reviewers',
      )
      .addSelect(
        `
      COUNT(
        CASE
          WHEN u.role = 'ADMIN'
          THEN 1
        END
      )
      `,
        'admins',
      )
      .addSelect(
        `
      COUNT(
        CASE
          WHEN u.is_active = true
          THEN 1
        END
      )
      `,
        'active',
      )
      .getRawOne();

    return stats;
  }
}
