import { TransactionSsl } from 'src/transaction-ssl/entities/transaction-ssl.entity';
import { CountryType, RegistrationCategory, UserType } from 'src/types/types';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['registration_category', 'user_type', 'country_type'])
export class RegistrationFee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('simple-enum', { enum: UserType })
  user_type: UserType;

  @Column('simple-enum', { enum: RegistrationCategory })
  registration_category: RegistrationCategory;

  @Column('simple-enum', { enum: CountryType })
  country_type: CountryType;

  @Column('decimal', { precision: 10, scale: 2 })
  early_bird_amount: number;

  @Column('decimal', { precision: 10, scale: 2 })
  regular_amount: number;

  @Column('decimal', { precision: 10, scale: 2 })
  late_amount: number;

  //Bi direaction
  @OneToMany(() => TransactionSsl, (item) => item.registration_fee)
  transaction_ssl: TransactionSsl;
}
