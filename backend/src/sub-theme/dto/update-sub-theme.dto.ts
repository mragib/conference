import { PartialType } from '@nestjs/mapped-types';
import { CreateSubThemeDto } from './create-sub-theme.dto';

export class UpdateSubThemeDto extends PartialType(CreateSubThemeDto) {}
