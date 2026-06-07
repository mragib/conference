import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentStatus } from 'src/types/types';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateTransactionSslDto } from './dto/create-transaction-ssl.dto';
import { UpdateTransactionSslDto } from './dto/update-transaction-ssl.dto';
import { TransactionSsl } from './entities/transaction-ssl.entity';
import { SslService } from './sslcommerz.service';

@Injectable()
export class TransactionSslService {
  constructor(
    @InjectRepository(TransactionSsl)
    private readonly transactionRepository: Repository<TransactionSsl>,
    private readonly sslService: SslService,
  ) {}
  async create(createTransactionSslDto: CreateTransactionSslDto, user: User) {
    createTransactionSslDto.status = PaymentStatus.INITIAL;
    createTransactionSslDto.user = user;
    const transaction = await this.transactionRepository.save(
      createTransactionSslDto,
    );

    const session = await this.sslService.createSession(transaction);

    return {
      success: true,
      gatewayUrl: session.GatewayPageURL,
    };
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
