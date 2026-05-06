import { Abstract } from 'src/abstract/entities/abstract.entity';
import { Reviewer } from 'src/reviewer/entities/reviewer.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['reviewerId', 'abstractId'])
export class AbstractAssign {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Abstract, (abstract) => abstract.assigns, {
    onDelete: 'CASCADE',
  })
  abstract: Abstract;

  @Column()
  abstractId: string;

  @ManyToOne(() => Reviewer, (reviewer) => reviewer.abstractAssigns, {
    onDelete: 'CASCADE',
  })
  reviewer: Reviewer;

  @Column()
  reviewerId: string;

  @Column({ nullable: true })
  is_agreed: boolean;

  @Column({ nullable: true })
  acknowledge_date: Date;

  @Column({ nullable: true })
  assign_date: Date;

  @Column('text', { nullable: true })
  agree_token: string | null;

  @Column('text', { nullable: true })
  disagree_token: string | null;

  @Column({ nullable: true })
  token_expiry: Date;
}
