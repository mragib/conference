import { PartialType } from '@nestjs/mapped-types';
import { CreateDateSettingDto } from './create-date-setting.dto';

export class UpdateDateSettingDto extends PartialType(CreateDateSettingDto) {}
