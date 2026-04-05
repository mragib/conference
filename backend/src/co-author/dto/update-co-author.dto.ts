import { PartialType } from '@nestjs/mapped-types';
import { CreateCoAuthorDto } from './create-co-author.dto';

export class UpdateCoAuthorDto extends PartialType(CreateCoAuthorDto) {}
