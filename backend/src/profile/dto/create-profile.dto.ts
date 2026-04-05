import {
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { UserType } from 'src/types/types';
import { User } from 'src/user/entities/user.entity';

export class CreateProfileDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  first_name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  last_name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(70)
  country: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  designation: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  organization: string;

  @IsNotEmpty()
  @IsEnum(UserType)
  user_type: UserType;

  @IsEmpty()
  created_by: User;
}
