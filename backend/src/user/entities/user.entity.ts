import { Exclude } from 'class-transformer';
import { Abstract } from 'src/abstract/entities/abstract.entity';
import { Profile } from 'src/profile/entities/profile.entity';
import { Reviewer } from 'src/reviewer/entities/reviewer.entity';
import { Session } from 'src/session/entities/session.entity';
import { TransactionSsl } from 'src/transaction-ssl/entities/transaction-ssl.entity';
import { Role } from 'src/types/types';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 60, nullable: true })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: true })
  is_active: boolean;

  @Exclude()
  @Column({ nullable: true })
  password: string;

  @Exclude()
  @Column({ type: 'text', nullable: true })
  @Index()
  refreshToken: string | null;

  @Exclude()
  @Column({ type: 'text', nullable: true })
  otp: string | null;

  @Exclude()
  @Column({ type: 'timestamp', nullable: true })
  otp_expiry: Date | null;

  @Exclude()
  @Column({ type: 'text', nullable: true })
  @Index()
  reset_token: string | null;

  @Exclude()
  @Column({ type: 'timestamp', nullable: true })
  reset_token_expiry: Date | null;

  @Column({ type: 'text', nullable: true })
  invite_token: string | null;

  @Column({ type: 'timestamp', nullable: true })
  invite_expiry: Date | null;

  @Column('simple-enum', { enum: Role, default: Role.RESEARCHER })
  role: Role;

  //   for bi directional
  @OneToOne(() => Session, (type) => type.user, { onDelete: 'CASCADE' })
  user_session: Session;

  @OneToOne(() => Profile, (item) => item.user)
  profile: Profile;

  @OneToMany(() => Abstract, (item) => item.user, { onDelete: 'CASCADE' })
  abstract: Abstract[];

  @OneToOne(() => Reviewer, (item) => item.user)
  reviewer: Reviewer;

  @OneToMany(() => TransactionSsl, (item) => item.user)
  transaction: TransactionSsl;

  @CreateDateColumn()
  created_at: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
