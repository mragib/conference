import { PartialType } from '@nestjs/mapped-types';
import { IsInt } from 'class-validator';
import { CreateAbstractDto } from './create-abstract.dto';

export class UpdateAbstractDto extends PartialType(CreateAbstractDto) {}
export class UpdateAbstractStatusDto {
  @IsInt()
  statusId: number;
}
