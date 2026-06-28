import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}
  create(createPaymentDto: CreatePaymentDto) {
    return this.paymentRepository.save(createPaymentDto);
  }

  async findMyPayments(user: User) {
    const paymentsDates = await this.paymentRepository.find({
      where: {
        user: {
          id: user.id,
        },
      },
      relations: {
        registration_fee: true,
        transaction: true,
      },
    });

    return paymentsDates;
  }

  async findAll() {
    const rawData = await this.paymentRepository
      .createQueryBuilder('payment')
      .leftJoin('payment.user', 'user')
      .leftJoin('user.profile', 'profile')
      .leftJoin('payment.registration_fee', 'registrationFee')
      .leftJoin('payment.transaction', 'transaction')
      .leftJoin('user.abstract', 'abstract')
      .select([
        'profile.first_name as first_name',
        'profile.last_name as last_name',
        'user.email as email',
        'profile.country as country',
        'profile.organization as organization',
        'profile.designation as designation',
        'profile.contact_number as contact_number',
        'registrationFee.user_type as registration_user_type',
        'registrationFee.registration_category as registration_category',
        'transaction.id as transaction_id',
        'transaction.registration_type as registration_type',
        'payment.amount as amount',
        'transaction.store_amount as store_amount',
        'payment.status as status',
        'payment.created_at as created_at',
      ])
      .addSelect('COUNT(DISTINCT abstract.id)', 'total_abstract')
      .addSelect(
        `SUM(CASE WHEN abstract.statusId = 2 THEN 1 ELSE 0 END)`,
        'accepted_abstract',
      )
      .groupBy('payment.id')
      .addGroupBy('user.id')
      .addGroupBy('profile.id')
      .addGroupBy('registrationFee.id')
      .addGroupBy('transaction.id')
      .getRawMany();

    // Explicitly serialize/format the raw string entries into proper types
    return rawData.map((item) => ({
      ...item,
      amount: parseFloat(item.amount || '0'),
      store_amount: parseFloat(item.store_amount || '0'),
      total_abstract: parseInt(item.total_abstract || '0', 10),
      accepted_abstract: parseInt(item.accepted_abstract || '0', 10),
    }));
  }

  async findAuthorDashboardStats(user: User) {
    const paymentStats = await this.paymentRepository
      .createQueryBuilder('payment')
      .leftJoin('payment.transaction', 'transaction')
      .leftJoin('transaction.registration_fee', 'fee')
      .select('fee.user_type', 'userType')
      .addSelect('fee.registration_category', 'registrationCategory')
      .addSelect('transaction.registration_type', 'registrationType')
      .addSelect('transaction.currency', 'currency')
      .addSelect('COUNT(payment.id)', 'count')
      .addSelect('SUM(payment.amount)', 'amount')
      .where('payment.userId = :userId', {
        userId: user.id,
      })
      .groupBy('fee.user_type')
      .addGroupBy('fee.registration_category')
      .addGroupBy('transaction.registration_type')
      .addGroupBy('transaction.currency')
      .getRawMany();

    return paymentStats;
  }

  async findAdminDashboardStats() {
    const participantStats = await this.paymentRepository
      .createQueryBuilder('p')
      .select('COUNT(p.id)', 'totalParticipants')
      .getRawOne();

    const amountStats = await this.paymentRepository
      .createQueryBuilder('p')
      .leftJoin('p.transaction', 't')
      .select('t.currency', 'currency')
      .addSelect('SUM(t.amount)', 'amount')
      .addSelect('SUM(t.store_amount)', 'store_amount')
      .groupBy('t.currency')
      .getRawMany();

    const registrationTypeStats = await this.paymentRepository
      .createQueryBuilder('p')
      .leftJoin('p.transaction', 't')
      .select('t.registration_type', 'registrationType')
      .addSelect('COUNT(p.id)', 'count')
      .groupBy('t.registration_type')
      .getRawMany();

    const participantTypeStats = await this.paymentRepository
      .createQueryBuilder('p')
      .leftJoin('p.transaction', 't')
      .select(
        `
      CASE
        WHEN t.currency = 'BDT'
        THEN 'LOCAL'
        ELSE 'INTERNATIONAL'
      END
      `,
        'participant_type',
      )
      .addSelect('COUNT(p.id)', 'count')
      .groupBy('participant_type')
      .getRawMany();

    return {
      totalParticipants: Number(participantStats.totalParticipants),
      amountStats,
      registrationTypeStats,
      participantTypeStats,
    };
  }
}
