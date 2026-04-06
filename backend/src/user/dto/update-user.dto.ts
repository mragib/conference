import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { CreateReviewerDto, CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UpdateReviewerDto extends PartialType(CreateReviewerDto) {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
