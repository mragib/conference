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

@Entity('abstracts')
export class Abstract {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  keyword: string;

  @Column()
  remarks: string;

  @Column()
  status: string;

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
