import { Module } from '@nestjs/common';
import { AbstractModule } from 'src/abstract/abstract.module';
import { PaymentModule } from 'src/payment/payment.module';
import { ReviewerModule } from 'src/reviewer/reviewer.module';
import { UserModule } from 'src/user/user.module';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';

@Module({
  imports: [PaymentModule, AbstractModule, ReviewerModule, UserModule],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
