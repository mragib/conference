import { DateSetting } from 'src/date-setting/entities/date-setting.entity';
import { UserType } from 'src/types/types';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RegistrationFee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('simple-enum', { enum: UserType })
  user_type: UserType;

  @ManyToOne(() => DateSetting, (item) => item.registration_fee, {
    onDelete: 'CASCADE',
  })
  date_setting: DateSetting;
}
