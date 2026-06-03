import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbstractAssignModule } from 'src/abstract-assign/abstract-assign.module';
import { MailModule } from 'src/mail/mail.module';
import { ReviewerModule } from 'src/reviewer/reviewer.module';
import { UserModule } from 'src/user/user.module';
import { AbstractController } from './abstract.controller';
import { AbstractService } from './abstract.service';
import { Abstract } from './entities/abstract.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Abstract]),
    ReviewerModule,
    AbstractAssignModule,
    MailModule,
    UserModule,
  ],
  controllers: [AbstractController],
  providers: [AbstractService],
  exports: [AbstractService],
})
export class AbstractModule {}
