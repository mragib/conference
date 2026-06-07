import { IsDate, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { RegistrationType } from 'src/types/types';

export class CreateDateSettingDto {
  @IsOptional()
  id?: number;

  @IsEnum(RegistrationType)
  @IsNotEmpty()
  name: RegistrationType;

  @IsDate()
  @IsNotEmpty()
  start_date: Date;

  @IsDate()
  @IsNotEmpty()
  end_date: Date;
}
