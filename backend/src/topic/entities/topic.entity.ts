import { Abstract } from 'src/abstract/entities/abstract.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Topic {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 150, unique: true })
  name: string;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User)
  created_by: User;

  @ManyToMany(() => User, (item) => item.topic)
  @JoinTable({ name: 'topic_reviewers' })
  user: User[];

  // Bi directional relation
  @OneToMany(() => Abstract, (item) => item.topic)
  abstract: Abstract[];
}
