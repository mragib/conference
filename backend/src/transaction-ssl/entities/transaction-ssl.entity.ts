import { RegistrationFee } from 'src/registration-fee/entities/registration-fee.entity';
import { PaymentStatus, RegistrationType } from 'src/types/types';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class TransactionSsl {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (item) => item.transaction)
  user: User;

  @ManyToOne(() => RegistrationFee, (item) => item.transaction_ssl)
  registration_fee: RegistrationFee;

  @Column()
  registrationFeeId: number;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column('simple-enum', { enum: PaymentStatus })
  status: PaymentStatus;

  @Column('simple-enum', { enum: RegistrationType })
  registration_type: RegistrationType;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
