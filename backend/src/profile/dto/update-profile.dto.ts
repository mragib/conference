import { PartialType } from '@nestjs/mapped-types';
import { IsEmpty } from 'class-validator';
import { User } from 'src/user/entities/user.entity';
import { CreateProfileDto } from './create-profile.dto';

export class UpdateProfileDto extends PartialType(CreateProfileDto) {
  @IsEmpty()
  updated_by: User;
}
