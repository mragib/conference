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

  @Column({ default: true })
  is_active: boolean;

  @Exclude()
  @Column()
  password: string;

  @Exclude()
  @Column({ type: 'text', nullable: true })
  refreshToken: string | null;

  @Exclude()
  @Column({ type: 'text', nullable: true })
  otp: string | null;

  @Exclude()
  @Column({ type: 'timestamp', nullable: true })
  otp_expiry: Date | null;

  @Column('simple-enum', { enum: Role, default: Role.RESEARCHER })
  role: Role;

  //   for bi directional
  @OneToOne(() => Session, (type) => type.user, { onDelete: 'CASCADE' })
  user_session: Session;

  @OneToOne(() => Profile, (item) => item.user)
  profile: Profile;

  @OneToMany(() => Abstract, (item) => item.user)
  abstract: Abstract[];

  @ManyToMany(() => Topic, (item) => item.user, { cascade: true })
  topic: Topic[];

  @OneToMany(() => AbstractReview, (item) => item.user)
  abstract_review: AbstractReview[];

  @DeleteDateColumn()
  deletedAt: Date;
}
