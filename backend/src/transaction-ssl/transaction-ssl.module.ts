import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionSsl } from './entities/transaction-ssl.entity';
import { SslService } from './sslcommerz.service';
import { TransactionSslController } from './transaction-ssl.controller';
import { TransactionSslService } from './transaction-ssl.service';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionSsl])],
  controllers: [TransactionSslController],
  providers: [TransactionSslService, SslService],
})
export class TransactionSslModule {}
