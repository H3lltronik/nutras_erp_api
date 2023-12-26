import { TimestampsEntity } from '@/src/common/timestamps-entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MovementConcept } from './movement_concept.entity';

@Entity({ name: 'movement_type' })
export class MovementType extends TimestampsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;
}
