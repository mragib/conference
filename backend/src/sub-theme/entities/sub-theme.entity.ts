import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SubTheme {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ default: true })
  is_active: boolean;
}
