import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentService } from 'src/payment/payment.service';
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
    private readonly paymentService: PaymentService,
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
  async success(transaction: TransactionSsl) {
    try {
      const saved = await this.transactionRepository.save({
        ...transaction,
        status: PaymentStatus.SUCCESS,
      });

      const updatedTransaction = await this.findOne(saved.id);

      if (!updatedTransaction)
        throw new NotFoundException('Transaction is not found');

      await this.paymentService.create({
        amount: updatedTransaction.amount,
        registration_fee: updatedTransaction.registration_fee,
        status: updatedTransaction.status,
        transaction: updatedTransaction,
        user: updatedTransaction.user,
      });

      return updatedTransaction;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async fail(transaction: TransactionSsl) {
    transaction.status = PaymentStatus.FAILED;
    return await this.transactionRepository.save(transaction);
  }

  async cancel(transaction: TransactionSsl) {
    transaction.status = PaymentStatus.CANCEL;
    return await this.transactionRepository.save(transaction);
  }

  findAll() {
    return `This action returns all transactionSsl`;
  }

  findOne(id: string) {
    return this.transactionRepository.findOne({
      where: {
        id,
      },
      relations: ['user', 'registration_fee'],
    });
  }

  update(id: number, updateTransactionSslDto: UpdateTransactionSslDto) {
    return `This action updates a #${id} transactionSsl`;
  }

  remove(id: number) {
    return `This action removes a #${id} transactionSsl`;
  }
}
