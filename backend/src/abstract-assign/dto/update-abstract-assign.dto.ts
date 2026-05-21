import { PartialType } from '@nestjs/mapped-types';
import { CreateAbstractAssignDto } from './create-abstract-assign.dto';

export class UpdateAbstractAssignDto extends PartialType(
  CreateAbstractAssignDto,
) {}
