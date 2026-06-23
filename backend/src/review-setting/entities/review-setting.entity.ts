import { AbstractReview } from 'src/abstract-review/entities/abstract-review.entity';
import { AbstractFieldEnum, AbstractMark } from 'src/types/types';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['type', 'name'])
export class ReviewSetting {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('simple-enum', { enum: AbstractFieldEnum })
  type: AbstractFieldEnum;

  @Column('simple-enum', { enum: AbstractMark })
  name: AbstractMark;

  @Column()
  value: number;

  @Column()
  description: string;

  // Bi Directional
  @OneToMany(() => AbstractReview, (item) => item.purpose_mark)
  review_purpose: AbstractReview;

  @OneToMany(() => AbstractReview, (item) => item.methodology_mark)
  review_methodology: AbstractReview;

  @OneToMany(() => AbstractReview, (item) => item.findings_mark)
  review_findings: AbstractReview;

  @OneToMany(() => AbstractReview, (item) => item.theoretical_mark)
  review_theoretical: AbstractReview;

  @OneToMany(() => AbstractReview, (item) => item.practical_mark)
  review_practical: AbstractReview;

  @OneToMany(() => AbstractReview, (item) => item.overall_mark)
  review_overall: AbstractReview;
}
