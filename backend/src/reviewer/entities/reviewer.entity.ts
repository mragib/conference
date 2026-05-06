import { AbstractAssign } from 'src/abstract-assign/entities/abstract-assign.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Reviewer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (item) => item.reviewer, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  @Column({ default: true })
  is_active: boolean;

  @Column({ unique: true })
  display_order: number;

  // Bi-directional relationship with AbstractAssign
  @OneToMany(() => AbstractAssign, (item) => item.reviewer)
  abstractAssigns: AbstractAssign[];
}
