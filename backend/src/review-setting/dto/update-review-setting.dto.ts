import { PartialType } from '@nestjs/mapped-types';
import { CreateReviewSettingDto } from './create-review-setting.dto';

export class UpdateReviewSettingDto extends PartialType(CreateReviewSettingDto) {}
