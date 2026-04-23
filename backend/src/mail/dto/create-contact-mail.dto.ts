import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ContactDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  message: string;
}
