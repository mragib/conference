import { Type } from 'class-transformer';
import {
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { PaymentStatus, RegistrationType } from 'src/types/types';
import { User } from 'src/user/entities/user.entity';

export class CreateTransactionSslDto {
  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  registrationFeeId: number;

  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsEnum(RegistrationType)
  registration_type: RegistrationType;

  @IsOptional()
  @IsEmpty()
  @IsEnum(PaymentStatus)
  status?: PaymentStatus;

  @IsEmpty()
  user: User;
}
