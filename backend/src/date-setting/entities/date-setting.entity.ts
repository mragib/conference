import { RegistrationFee } from 'src/registration-fee/entities/registration-fee.entity';
import { RegistrationType } from 'src/types/types';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DateSetting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('simple-enum', { enum: RegistrationType })
  name: RegistrationType;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  //   Bi directional
  @OneToMany(() => RegistrationFee, (item) => item.date_setting)
  registration_fee: RegistrationFee[];
}
