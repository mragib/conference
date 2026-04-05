import { PartialType } from '@nestjs/mapped-types';
import { CreateAbstractReviewDto } from './create-abstract-review.dto';

export class UpdateAbstractReviewDto extends PartialType(CreateAbstractReviewDto) {}
