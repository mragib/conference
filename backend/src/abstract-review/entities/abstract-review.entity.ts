import { Abstract } from 'src/abstract/entities/abstract.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Unique(['user', 'abstract'])
export class AbstractReview {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  mark: number;

  @Column('text')
  comment_to_author: string;

  @Column('text')
  comment_to_chair: string;

  @ManyToOne(() => User, (item) => item.abstract_review)
  user: User;

  @ManyToOne(() => Abstract, (item) => item.abstract_review)
  abstract: Abstract;

  @Column()
  abstractId: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
