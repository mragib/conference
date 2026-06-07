import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { CountryType, RegistrationCategory, UserType } from 'src/types/types';

export class CreateRegistrationFeeDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsEnum(UserType)
  @IsNotEmpty()
  user_type: UserType;

  @IsEnum(RegistrationCategory)
  @IsNotEmpty()
  registration_category: RegistrationCategory;

  @IsEnum(CountryType)
  @IsNotEmpty()
  country_type: CountryType;

  @IsNotEmpty()
  @IsNumber()
  early_bird_amount: number;

  @IsNotEmpty()
  @IsNumber()
  regular_amount: number;

  @IsNotEmpty()
  @IsNumber()
  late_amount: number;
}
