import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Topic } from 'src/topic/entities/topic.entity';
import { Role } from 'src/types/types';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(13)
  phone: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  refreshToken?: string;

  @IsString()
  @IsOptional()
  otp?: string;

  @IsDate()
  @IsOptional()
  otp_expiry?: Date;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}

export class CreateGoogleUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  name: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @IsString()
  @IsOptional()
  refreshToken?: string;

  @IsString()
  password: string;
}

export class ChangeRoleDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
}

export class CreateReviewerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsArray()
  topic: Topic[];
}
