import { PartialType } from '@nestjs/mapped-types';
import { CreateRegistrationFeeDto } from './create-registration-fee.dto';

export class UpdateRegistrationFeeDto extends PartialType(CreateRegistrationFeeDto) {}
