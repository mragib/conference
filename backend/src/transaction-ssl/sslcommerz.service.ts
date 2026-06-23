import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { ProfileService } from 'src/profile/profile.service';
import SSLCommerzPayment from 'sslcommerz-lts';
import { TransactionSsl } from './entities/transaction-ssl.entity';

@Injectable()
export class SslService {
  constructor(
    private readonly configService: ConfigService,
    private readonly profileService: ProfileService,
  ) {}

  async createSession(transaction: TransactionSsl) {
    const STORE_ID = this.configService.get<string>('SSL_STORE_ID');
    const SSL_STORE_PASSWORD =
      this.configService.get<string>('SSL_STORE_PASSWORD');
    const SSLCZ_IS_LIVE =
      this.configService.get<string>('SSLCZ_IS_LIVE') === 'true';
    const backendUrl = this.configService.get<string>('BACKEND_URL');

    const sslcz = new SSLCommerzPayment(
      STORE_ID,
      SSL_STORE_PASSWORD,
      SSLCZ_IS_LIVE,
    );

    if (!STORE_ID || !SSL_STORE_PASSWORD) {
      throw new Error('SSLCommerz credentials are not configured');
    }

    const profile = await this.profileService.profile(transaction.user);

    const { data: user } = profile;

    const data = {
      total_amount: transaction.amount,
      currency: user.country === 'BD' ? 'BDT' : 'USD',
      tran_id: transaction.id,

      success_url: `${backendUrl}/transaction-ssl/success`,
      fail_url: `${backendUrl}/transaction-ssl/fail`,
      cancel_url: `${backendUrl}/transaction-ssl/cancel`,
      ipn_url: `${backendUrl}/transaction-ssl/ipn`,

      shipping_method: 'NO',

      product_name: 'Conference Registration',
      product_category: 'Conference',
      product_profile: 'general',

      cus_name: user.first_name + ' ' + user.last_name,
      cus_email: user.user.email,
      cus_add1: 'N/A',
      cus_city: user.organization,
      cus_country: user.country,
      cus_phone: user.contact_number,
    };

    return sslcz.init(data);
  }

  async validatePayment(valId: string) {
    const STORE_ID = this.configService.get<string>('SSL_STORE_ID');
    const STORE_PASSWORD = this.configService.get<string>('SSL_STORE_PASSWORD');

    const isLive = this.configService.get<string>('SSLCZ_IS_LIVE') === 'true';

    const baseUrl = isLive
      ? 'https://securepay.sslcommerz.com'
      : 'https://sandbox.sslcommerz.com';

    const { data } = await axios.get(
      `${baseUrl}/validator/api/validationserverAPI.php`,
      {
        params: {
          val_id: valId,
          store_id: STORE_ID,
          store_passwd: STORE_PASSWORD,
          format: 'json',
        },
      },
    );

    return data;
  }
}
