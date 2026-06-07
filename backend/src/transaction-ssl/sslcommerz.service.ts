import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import SSLCommerzPayment from 'sslcommerz-lts';
import { TransactionSsl } from './entities/transaction-ssl.entity';

@Injectable()
export class SslService {
  constructor(private readonly configService: ConfigService) {}

  async createSession(transaction: TransactionSsl) {
    const STORE_ID = this.configService.get<string>('SSL_STORE_ID');
    const SSL_STORE_PASSWORD =
      this.configService.get<string>('SSL_STORE_PASSWORD');
    const SSLCZ_IS_LIVE =
      this.configService.get<string>('SSLCZ_IS_LIVE') === 'true';

    const sslcz = new SSLCommerzPayment(
      STORE_ID,
      SSL_STORE_PASSWORD,
      SSLCZ_IS_LIVE,
    );

    const data = {
      total_amount: transaction.amount,
      currency: 'BDT',
      tran_id: transaction.id,

      success_url: `${process.env.BACKEND_URL}/transaction-ssl/success`,

      fail_url: `${process.env.BACKEND_URL}/transaction-ssl/fail`,

      cancel_url: `${process.env.BACKEND_URL}/transaction-ssl/cancel`,

      ipn_url: `${process.env.BACKEND_URL}/transaction-ssl/ipn`,

      shipping_method: 'NO',

      product_name: 'Conference Registration',
      product_category: 'Conference',
      product_profile: 'general',

      cus_name: transaction.user.name,
      cus_email: transaction.user.email,
      cus_add1: 'N/A',
      cus_city: 'Dhaka',
      cus_country: 'Bangladesh',
      cus_phone: '01700000000',
    };
    return sslcz.init(data);
  }
}
