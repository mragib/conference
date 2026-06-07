import { IsEnum, IsNotEmpty } from 'class-validator';
import { RegistrationCategory } from 'src/types/types';

export class FindRegistrationFeeDto {
  @IsEnum(RegistrationCategory)
  @IsNotEmpty()
  registration_category: RegistrationCategory;
}
