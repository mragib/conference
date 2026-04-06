import {
  IsArray,
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { CoAuthor } from 'src/co-author/entities/co-author.entity';
import { User } from 'src/user/entities/user.entity';

export class CreateAbstractDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  keyword: string;

  @IsString()
  @IsNotEmpty()
  remarks: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsNotEmpty()
  ip_address: string;

  @IsEmpty()
  user: User;

  @IsNotEmpty()
  @IsString()
  topicId: string;

  @IsOptional()
  @IsArray()
  co_authors: CoAuthor[];
}
