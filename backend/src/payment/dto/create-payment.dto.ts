import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { RegistrationFee } from 'src/registration-fee/entities/registration-fee.entity';
import { TransactionSsl } from 'src/transaction-ssl/entities/transaction-ssl.entity';
import { PaymentStatus } from 'src/types/types';
import { User } from 'src/user/entities/user.entity';

export class CreatePaymentDto {
  @IsNotEmpty()
  user: User;

  @IsNotEmpty()
  transaction: TransactionSsl;

  @IsNotEmpty()
  registration_fee: RegistrationFee;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsEnum(PaymentStatus)
  status: PaymentStatus;
}
