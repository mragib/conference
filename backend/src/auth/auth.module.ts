import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import googleOauthConfig from 'src/config/google-oauth.config';
import jwtConfig from 'src/config/jwt.config';
import refreshConfig from 'src/config/refresh.config';
import { SessionModule } from 'src/session/session.module';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategies/google.strategy';
import { jwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { RefreshStrategy } from './strategies/refresh-token.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(refreshConfig),
    ConfigModule.forFeature(googleOauthConfig),
    SessionModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    jwtStrategy,
    RefreshStrategy,
    GoogleStrategy,
  ],
})
export class AuthModule {}
