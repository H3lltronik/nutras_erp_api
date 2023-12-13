import { TimestampsEntity } from '@/src/common/timestamps-entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MovementConcept extends TimestampsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;
}
