import { IsEmpty, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class CreateTopicDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  name: string;

  @IsEmpty()
  created_by: User;
}
