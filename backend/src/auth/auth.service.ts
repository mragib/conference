import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { hash, verify } from 'argon2';
import refreshConfig from 'src/config/refresh.config';
import { MailService } from 'src/mail/mail.service';
import { ProfileService } from 'src/profile/profile.service';
import { SessionService } from 'src/session/session.service';
import { JWTPayload, Role } from 'src/types/types';
import {
  CreateGoogleUserDto,
  CreateUserDto,
} from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    private sessionService: SessionService,
    private readonly profileService: ProfileService,
    private readonly mailService: MailService,
    @Inject(refreshConfig.KEY)
    private refreshConfigaration: ConfigType<typeof refreshConfig>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  async validateLocalUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const isPasswordValid = await verify(user.password, password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return {
      id: user.id,
      name: user.name,
      role: user.role,
    };
  }

  async login(userId: string, name: string, role: Role) {
    const { accessToken, refreshToken } = await this.generateToken(userId);

    const hashedRefreshToken = await hash(refreshToken);
    await this.userService.updateRefreshToken(userId, hashedRefreshToken);

    return {
      id: userId,
      name,
      role,
      accessToken,
      refreshToken,
    };
  }

  async generateToken(userId: string) {
    const payload: JWTPayload = { sub: userId };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, this.refreshConfigaration),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async validateUserById(userId: string) {
    const user = await this.userService.findOne(userId);
    if (!user) throw new UnauthorizedException('User not found');
    return {
      id: user.id,
      name: user.name,
      role: user.role,
    };
  }

  async validateRefreshToken(userId: string, refreshToken: string) {
    const user = await this.userService.findOne(userId);
    if (!user) throw new UnauthorizedException('User not found');

    const hashedRefreshToken = await hash(refreshToken);
    await this.userService.updateRefreshToken(userId, hashedRefreshToken);

    const isRefreshTokenValid = await verify(user.refreshToken!, refreshToken);

    if (!isRefreshTokenValid)
      throw new UnauthorizedException('Invalid refresh token');

    return {
      id: user.id,
      name: user.name,
    };
  }

  async refresh(userId: string, name: string) {
    const { accessToken, refreshToken } = await this.generateToken(userId);

    const hashedRefreshToken = await hash(refreshToken);
    await this.userService.updateRefreshToken(userId, hashedRefreshToken);

    return {
      id: userId,
      name,
      accessToken,
      refreshToken,
    };
  }

  async validateGooleUser(googleUser: CreateGoogleUserDto) {
    const foundUser = await this.userService.findByEmail(googleUser.email);

    if (foundUser) return foundUser;

    const newUser = await this.userService.createGoogleUser(googleUser);
    return newUser;
  }

  async signout(id: string) {
    await this.sessionService.remove(id);
    return await this.userService.updateRefreshToken(id, null);
  }

  async getProfile(user: User) {
    const foundUser = await this.userService.findOne(user.id);
    if (!foundUser) throw new NotFoundException('User is not found');

    user.email = foundUser.email;
    return await this.profileService.profile(user);
  }

  async forgotPassword(email: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('User not found');
    // Generate OTP and set expiry    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otp_expiry = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    try {
      await this.userService.update(user.id, {
        otp,
        otp_expiry,
      });

      // Send OTP email
      await this.mailService.sendEmail(
        user.email,
        'Password Reset OTP',
        'otp-email',
        { otp },
      );
      return {
        otp,
        status: 'success',
      };
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
