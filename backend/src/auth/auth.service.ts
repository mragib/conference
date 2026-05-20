import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { hash, verify } from 'argon2';
import * as crypto from 'crypto';
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
    const userResponse = await this.userService.create(createUserDto);
    const { accessToken, refreshToken } = await this.generateToken(
      userResponse.data.id,
    );

    const hashedRefreshToken = await hash(refreshToken);
    await this.userService.updateRefreshToken(
      userResponse.data.id,
      hashedRefreshToken,
    );

    return {
      id: userResponse.data.id,
      name: userResponse.data.name,
      role: userResponse.data.role,
      accessToken,
      refreshToken,
      status: userResponse.status,
      statusCode: userResponse.statusCode,
      message: userResponse.message,
    };
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
    const user = await this.userService.findById(userId);
    if (!user) throw new UnauthorizedException('User not found');
    return {
      id: user.id,
      name: user.name,
      role: user.role,
    };
  }

  async validateRefreshToken(userId: string, refreshToken: string) {
    const user = await this.userService.findById(userId);
    if (!user) throw new UnauthorizedException('User not found');

    const isRefreshTokenValid = await verify(user.refreshToken!, refreshToken);

    if (!isRefreshTokenValid)
      throw new UnauthorizedException('Invalid refresh token');

    const hashedRefreshToken = await hash(refreshToken);
    await this.userService.updateRefreshToken(userId, hashedRefreshToken);

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
    const foundUser = await this.userService.findUserForGoogle(
      googleUser.email,
    );
    if (foundUser && !foundUser.is_active)
      throw new UnauthorizedException(
        'You are inactive user. Please contact with authority',
      );
    if (foundUser) return foundUser;

    const newUser = await this.userService.createGoogleUser(googleUser);
    return newUser;
  }

  async signout(id: string) {
    await this.sessionService.remove(id);
    return await this.userService.updateRefreshToken(id, null);
  }

  async getProfile(user: User) {
    const foundUser = await this.userService.findById(user.id);
    if (!foundUser) throw new NotFoundException('User is not found');

    user.email = foundUser.email;
    return await this.profileService.profile(user);
  }

  async forgotPassword(email: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('User not found');

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
        status: 'success',
        message: 'OTP sent to email',
      };
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async verifyOtp(email: string, otp: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid request');

    if (user.otp !== otp) {
      throw new UnauthorizedException('Invalid OTP');
    }

    if (!user.otp_expiry || new Date() > user.otp_expiry) {
      throw new UnauthorizedException('OTP expired');
    }

    // mark verified (temporary token or flag)
    const resetToken = crypto.randomUUID();
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    const reset_token_expiry = new Date(Date.now() + 10 * 60 * 1000); // reset token valid for 10 minutes

    await this.userService.update(user.id, {
      reset_token: resetToken,
      otp: null,
      otp_expiry: null,
      reset_token_expiry,
    });

    return {
      resetToken,
      message: 'OTP verified',
    };
  }

  async resetPassword(resetToken: string, password: string) {
    const user = await this.userService.findByResetToken(resetToken);
    if (!user) throw new UnauthorizedException('Invalid token');

    if (!user.reset_token_expiry || user.reset_token_expiry < new Date()) {
      throw new UnauthorizedException('Reset token expired');
    }

    const hashedPassword = await hash(password);

    await this.userService.update(user.id, {
      password: hashedPassword,
      reset_token: null,
    });

    const { accessToken, refreshToken } = await this.generateToken(user.id);

    return {
      success: true,
      accessToken,
      refreshToken,
      id: user.id,
      name: user.name,
      role: user.role,
    };
  }

  async validateInvite(token: string) {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await this.userService.findOne({
      where: { invite_token: hashedToken },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid invite link');
    }

    if (!user.invite_expiry || user.invite_expiry < new Date()) {
      throw new UnauthorizedException('Invite expired');
    }

    return {
      email: user.email,
      name: user.name,
      role: user.role,
    };
  }

  async setPassword(token: string, password: string) {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await this.userService.findOne({
      where: { invite_token: hashedToken },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid or expired invitation link');
    }

    if (!user.invite_expiry || user.invite_expiry < new Date()) {
      throw new UnauthorizedException('Invitation link expired');
    }

    const hashedPassword = await argon2.hash(password);

    await this.userService.update(user.id, {
      password: hashedPassword,
      is_active: true,
      invite_token: null,
      invite_expiry: null,
    });
    const { accessToken, refreshToken } = await this.generateToken(user.id);

    return {
      success: true,
      accessToken,
      refreshToken,
      id: user.id,
      name: user.name,
      role: user.role,
    };
  }
}
