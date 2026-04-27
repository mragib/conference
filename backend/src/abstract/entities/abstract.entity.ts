import { AbstractReview } from 'src/abstract-review/entities/abstract-review.entity';
import { CoAuthor } from 'src/co-author/entities/co-author.entity';
import { Topic } from 'src/topic/entities/topic.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AbstractStatus } from './abstract-status.entity';

@Entity('abstracts')
export class Abstract {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  purpose: string;

  @Column({ type: 'text' })
  methodology: string;

  @Column({ type: 'text' })
  findings: string;

  @Column({ type: 'text' })
  theoretical: string;

  @Column({ type: 'text' })
  practical: string;

  @Column({ type: 'text' })
  references: string;

  @Column()
  keyword: string;

  @Column({ nullable: true })
  remarks: string;

  @ManyToOne(() => AbstractStatus, (status) => status.abstract)
  status: AbstractStatus;

  @Column({ nullable: true })
  statusId: string;

  @Column()
  ip_address: string;

  @ManyToOne(() => User, (item) => item.abstract)
  user: User;

  @ManyToOne(() => Topic, (item) => item.abstract)
  topic: Topic;

  @Column()
  topicId: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User)
  updated_by: User;

  @UpdateDateColumn()
  updated_at: Date;

  //   Bi directional relation
  @OneToMany(() => CoAuthor, (item) => item.abstract, { cascade: true })
  co_authors: CoAuthor[];

  @OneToMany(() => AbstractReview, (item) => item.abstract)
  abstract_review: AbstractReview[];
}
