import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Role } from 'src/types/types';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  name: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }: { value: string }) => value?.toLowerCase())
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
  otp?: string | null;

  @IsDate()
  @IsOptional()
  otp_expiry?: Date | null;

  @IsString()
  @IsOptional()
  reset_token?: string | null;

  @IsString()
  @IsOptional()
  reset_token_expiry?: Date | null;

  @IsDate()
  @IsOptional()
  invite_expiry?: Date | null;

  @IsString()
  @IsOptional()
  invite_token?: string | null;

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
  @Transform(({ value }: { value: string }) => value?.toLowerCase())
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

export class CreateReviewerUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => value?.toLowerCase())
  email: string;
}
