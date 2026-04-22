import { Exclude } from 'class-transformer';
import { AbstractReview } from 'src/abstract-review/entities/abstract-review.entity';
import { Abstract } from 'src/abstract/entities/abstract.entity';
import { Profile } from 'src/profile/entities/profile.entity';
import { Session } from 'src/session/entities/session.entity';
import { Topic } from 'src/topic/entities/topic.entity';
import { Role } from 'src/types/types';
import {
  Column,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 60, nullable: true })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: false })
  is_active: boolean;

  @Exclude()
  @Column({ nullable: true })
  password: string;

  @Exclude()
  @Column({ type: 'text', nullable: true })
  @Index()
  refreshToken: string | null;

  @Exclude()
  @Column({ type: 'text', nullable: true })
  otp: string | null;

  @Exclude()
  @Column({ type: 'timestamp', nullable: true })
  otp_expiry: Date | null;

  @Exclude()
  @Column({ type: 'text', nullable: true })
  @Index()
  reset_token: string | null;

  @Exclude()
  @Column({ type: 'timestamp', nullable: true })
  reset_token_expiry: Date | null;

  @Column({ type: 'text', nullable: true })
  invite_token: string | null;

  @Column({ type: 'timestamp', nullable: true })
  invite_expiry: Date | null;

  @Column('simple-enum', { enum: Role, default: Role.RESEARCHER })
  role: Role;

  //   for bi directional
  @OneToOne(() => Session, (type) => type.user, { onDelete: 'CASCADE' })
  user_session: Session;

  @OneToOne(() => Profile, (item) => item.user)
  profile: Profile;

  @OneToMany(() => Abstract, (item) => item.user)
  abstract: Abstract[];

  @ManyToMany(() => Topic, (item) => item.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  topic: Topic[];

  @OneToMany(() => AbstractReview, (item) => item.user)
  abstract_review: AbstractReview[];

  @DeleteDateColumn()
  deletedAt: Date;
}
