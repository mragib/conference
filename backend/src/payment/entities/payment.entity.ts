import { RegistrationFee } from 'src/registration-fee/entities/registration-fee.entity';
import { TransactionSsl } from 'src/transaction-ssl/entities/transaction-ssl.entity';
import { PaymentStatus } from 'src/types/types';
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
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (item) => item.payment)
  user: User;

  @ManyToOne(() => TransactionSsl, (item) => item.payment)
  transaction: TransactionSsl;

  @ManyToOne(() => RegistrationFee, (item) => item.payment)
  registration_fee: RegistrationFee;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column('simple-enum', { enum: PaymentStatus })
  status: PaymentStatus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
