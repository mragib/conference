import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from 'src/mail/mail.module';
import { ReviewerModule } from 'src/reviewer/reviewer.module';
import { AbstractAssignController } from './abstract-assign.controller';
import { AbstractAssignService } from './abstract-assign.service';
import { AbstractAssign } from './entities/abstract-assign.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AbstractAssign]),
    MailModule,
    ReviewerModule,
  ],
  controllers: [AbstractAssignController],
  providers: [AbstractAssignService],
  exports: [AbstractAssignService],
})
export class AbstractAssignModule {}
