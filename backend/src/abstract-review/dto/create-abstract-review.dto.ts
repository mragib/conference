import { IsEmpty, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ReviewSetting } from 'src/review-setting/entities/review-setting.entity';
import { User } from 'src/user/entities/user.entity';

export class CreateAbstractReviewDto {
  @IsOptional()
  purpose_mark: ReviewSetting;

  @IsOptional()
  purposeMarkId: string;

  @IsOptional()
  methodology_mark: ReviewSetting;

  @IsOptional()
  methodologyMarkId: string;

  @IsOptional()
  findings_mark: ReviewSetting;

  @IsOptional()
  findingsMarkId: string;

  @IsOptional()
  theoretical_mark: ReviewSetting;

  @IsOptional()
  theoreticalMarkId: string;

  @IsOptional()
  practical_mark: ReviewSetting;

  @IsOptional()
  practicalMarkId: string;

  @IsOptional()
  overall_mark: ReviewSetting;

  @IsOptional()
  overallMarkId: string;

  @IsNotEmpty()
  @IsString()
  comment_to_author: string;

  @IsNotEmpty()
  @IsString()
  abstractId: string;

  @IsEmpty()
  created_by: User;
}
