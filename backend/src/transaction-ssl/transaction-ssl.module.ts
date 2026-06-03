import { Module } from '@nestjs/common';
import { TransactionSslService } from './transaction-ssl.service';
import { TransactionSslController } from './transaction-ssl.controller';

@Module({
  controllers: [TransactionSslController],
  providers: [TransactionSslService],
})
export class TransactionSslModule {}
