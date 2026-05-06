import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from 'src/mail/mail.module';
import { UserModule } from 'src/user/user.module';
import { Reviewer } from './entities/reviewer.entity';
import { ReviewerController } from './reviewer.controller';
import { ReviewerService } from './reviewer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reviewer]), UserModule, MailModule],
  controllers: [ReviewerController],
  providers: [ReviewerService],
  exports: [ReviewerService],
})
export class ReviewerModule {}
