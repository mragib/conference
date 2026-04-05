import { UserType } from 'src/types/types';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 150 })
  first_name: string;

  @Column({ length: 150 })
  last_name: string;

  @Column({ length: 70 })
  country: string;

  @Column({ length: 100 })
  designation: string;

  @Column({ length: 200 })
  organization: string;

  @Column('simple-enum', { enum: UserType })
  user_type: UserType;

  @OneToOne(() => User, (item) => item.profile)
  @JoinColumn()
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, { nullable: true })
  created_by: User;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, { nullable: true })
  updated_by: User;
}
