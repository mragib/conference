import { Abstract } from 'src/abstract/entities/abstract.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Unique(['abstract'])
export class AbstractReview {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  mark: number;

  @Column('text')
  comment_to_author: string;

  @Column('text')
  comment_to_chair: string;

  @OneToOne(() => Abstract, (item) => item.abstract_review, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  abstract: Abstract;

  @Column()
  abstractId: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
