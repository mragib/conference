import {
  IsArray,
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { CoAuthor } from 'src/co-author/entities/co-author.entity';
import { User } from 'src/user/entities/user.entity';
import { AbstractStatus } from '../entities/abstract-status.entity';

export class CreateAbstractDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  purpose: string;

  @IsString()
  @IsNotEmpty()
  methodology: string;

  @IsString()
  @IsNotEmpty()
  findings: string;

  @IsString()
  @IsNotEmpty()
  theoretical: string;

  @IsString()
  @IsNotEmpty()
  practical: string;

  @IsString()
  @IsNotEmpty()
  references: string;

  @IsString()
  @IsNotEmpty()
  keyword: string;

  @IsString()
  @IsOptional()
  remarks: string;

  @IsOptional()
  @IsNotEmpty()
  status: AbstractStatus;

  @IsString()
  @IsOptional()
  statusId: string;

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
