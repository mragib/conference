import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { AbstractFieldEnum, AbstractMark } from 'src/types/types';

export class CreateReviewSettingDto {
  @IsEnum(AbstractFieldEnum)
  @IsNotEmpty()
  type: AbstractFieldEnum;

  @IsEnum(AbstractMark)
  @IsNotEmpty()
  name: AbstractMark;

  @IsNotEmpty()
  @IsNumber()
  value: number;

  @IsNotEmpty()
  @IsString()
  description: string;
}
