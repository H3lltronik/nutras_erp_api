import { TimestampsEntity } from '@/src/common/timestamps-entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MovementType } from './movement_type.entity';

@Entity()
export class MovementConcept extends TimestampsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ type: 'uuid', nullable: true })
  movementTypeId: string;

  @ManyToOne(() => MovementType, (movementType) => movementType.id)
  @JoinColumn({ name: 'movementTypeId' })
  movementType: MovementType;
}
