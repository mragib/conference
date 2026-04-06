import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbstractReviewModule } from './abstract-review/abstract-review.module';
import { AbstractModule } from './abstract/abstract.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles/roles.guard';
import { CoAuthorModule } from './co-author/co-author.module';
import dbConfig from './config/db.config';
import { ProfileModule } from './profile/profile.module';
import { SessionModule } from './session/session.module';
import { SettingModule } from './setting/setting.module';
import { TopicModule } from './topic/topic.module';
import { UserModule } from './user/user.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig],
    }),

    TypeOrmModule.forRootAsync({
      useFactory: dbConfig,
    }),

    UserModule,

    AuthModule,

    SessionModule,

    ProfileModule,

    TopicModule,

    AbstractModule,

    CoAuthorModule,

    SettingModule,

    AbstractReviewModule,

    MailModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
