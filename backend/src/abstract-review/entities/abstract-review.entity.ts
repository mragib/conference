import { Abstract } from 'src/abstract/entities/abstract.entity';
import { ReviewSetting } from 'src/review-setting/entities/review-setting.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
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

  @ManyToOne(() => ReviewSetting, (item) => item.review_purpose)
  purpose_mark: ReviewSetting;

  @Column()
  purposeMarkId: string;

  @ManyToOne(() => ReviewSetting, (item) => item.review_methodology)
  methodology_mark: ReviewSetting;

  @Column()
  methodologyMarkId: string;

  @ManyToOne(() => ReviewSetting, (item) => item.review_findings)
  findings_mark: ReviewSetting;

  @Column()
  findingsMarkId: string;

  @ManyToOne(() => ReviewSetting, (item) => item.review_theoretical)
  theoretical_mark: ReviewSetting;

  @Column()
  theoreticalMarkId: string;

  @ManyToOne(() => ReviewSetting, (item) => item.review_practical)
  practical_mark: ReviewSetting;

  @Column()
  practicalMarkId: string;

  @ManyToOne(() => ReviewSetting, (item) => item.review_overall)
  overall_mark: ReviewSetting;

  @Column()
  overallMarkId: string;

  @OneToOne(() => Abstract, (item) => item.abstract_review, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  abstract: Abstract;

  @Column()
  abstractId: string;

  @Column('text')
  comment_to_author: string;

  @ManyToOne(() => User, (item) => item.abstract_review)
  created_by: User;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User)
  updated_by: User;

  @UpdateDateColumn()
  updated_at: Date;
}
