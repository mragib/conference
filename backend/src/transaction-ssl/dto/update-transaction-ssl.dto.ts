import { PartialType } from '@nestjs/mapped-types';
import { CreateTransactionSslDto } from './create-transaction-ssl.dto';

export class UpdateTransactionSslDto extends PartialType(CreateTransactionSslDto) {}
