import { IsEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class CreateAbstractReviewDto {
  @IsNotEmpty()
  @IsNumber()
  mark: number;

  @IsNotEmpty()
  @IsString()
  comment_to_author: string;

  @IsNotEmpty()
  @IsString()
  comment_to_chair: string;

  @IsNotEmpty()
  @IsString()
  abstractId: string;

  @IsEmpty()
  user: User;
}
