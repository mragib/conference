import { Injectable } from '@nestjs/common';
import { CreateTransactionSslDto } from './dto/create-transaction-ssl.dto';
import { UpdateTransactionSslDto } from './dto/update-transaction-ssl.dto';

@Injectable()
export class TransactionSslService {
  create(createTransactionSslDto: CreateTransactionSslDto) {
    return 'This action adds a new transactionSsl';
  }

  findAll() {
    return `This action returns all transactionSsl`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transactionSsl`;
  }

  update(id: number, updateTransactionSslDto: UpdateTransactionSslDto) {
    return `This action updates a #${id} transactionSsl`;
  }

  remove(id: number) {
    return `This action removes a #${id} transactionSsl`;
  }
}
