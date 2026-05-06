import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Abstract } from './abstract.entity';

@Entity()
export class AbstractStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Abstract, (abstract) => abstract.status)
  abstract: Abstract[];
}
