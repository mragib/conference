import { Abstract } from 'src/abstract/entities/abstract.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CoAuthor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  first_name: string;

  @Column({ length: 100 })
  last_name: string;

  @Column({ length: 150 })
  email: string;

  @Column({ length: 100 })
  organization: string;

  @ManyToOne(() => Abstract, (item) => item.co_authors)
  abstract: Abstract;
}
