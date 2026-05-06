import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { CreateReviewerUserDto } from 'src/user/dto/create-user.dto';

export class CreateReviewerDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateReviewerUserDto)
  user: CreateReviewerUserDto;

  @IsBoolean()
  @IsOptional()
  is_active: boolean;

  @IsNumber()
  @IsNotEmpty()
  display_order: number;
}
