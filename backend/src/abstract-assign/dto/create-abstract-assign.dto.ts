import {
  IsBoolean,
  IsDate,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { Abstract } from 'src/abstract/entities/abstract.entity';
import { Reviewer } from 'src/reviewer/entities/reviewer.entity';

export class CreateAbstractAssignDto {
  @IsNotEmptyObject()
  @IsObject()
  reviewer: Reviewer;

  @IsNotEmptyObject()
  @IsObject()
  abstract: Abstract;

  @IsOptional()
  @IsBoolean()
  is_agreed?: boolean;

  @IsOptional()
  @IsDate()
  acknowledge_date?: Date;

  @IsOptional()
  @IsDate()
  assign_date: Date;

  @IsOptional()
  @IsString()
  agree_token?: string;

  @IsOptional()
  @IsString()
  disagree_token?: string;

  @IsOptional()
  @IsDate()
  token_expiry?: Date;
}
