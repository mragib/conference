import { RegistrationType } from 'src/types/types';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DateSetting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('simple-enum', { enum: RegistrationType, unique: true })
  name: RegistrationType;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;
}
