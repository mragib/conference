import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
import { GetUser } from './decorators/get-user.decorator';
import { Public } from './decorators/public.decorators';
import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';
import { RefreshAuthGuard } from './guards/jwt-auth/refresh-auth.guard';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  signin(@Request() req: any) {
    return this.authService.login(req.user.id, req.user.name, req.user.role);
  }

  @Get('profile')
  getProfile(@GetUser() user: User) {
    return { message: 'Hello ' + user.name };
  }

  @Public()
  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  async getRefresh(@Request() req: any) {
    const user = req.user;
    return await this.authService.refresh(user.id, user.name);
  }

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin() {}

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleCallback(@Request() req, @Res() res: Response) {
    const response = await this.authService.login(
      req.user.id,
      req.user.name,
      req.user.role,
    );
    res.redirect(
      `http://localhost:3000/api/auth/google/callback?userId=${response.id}&name=${response.name}&accessToken=${response.accessToken}&refreshToken=${response.refreshToken}&role=${response.role}`,
    );
  }

  @Post('signout')
  signout(@Req() req) {
    return this.authService.signout(req.user.id);
  }
}
