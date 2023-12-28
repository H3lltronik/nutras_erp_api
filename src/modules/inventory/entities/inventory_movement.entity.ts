import { TimestampsEntity } from '@/src/common/timestamps-entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Warehouse } from '../../warehouse/entities/warehouse.entity';
import { InventoryMovementLote } from './inventory_movement_lote.entity';
import { MovementConcept } from './movement_concept.entity';

@Entity()
export class InventoryMovement extends TimestampsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'timestamp', default: new Date().toISOString(), nullable: false})
  date: string;

  @Column({ nullable: true })
  ot_id: string;

  @Column({ type: 'text', nullable: true })
  reason: string;

  @Column({ type: 'uuid', nullable: true })
  movementConceptId: string;

  @ManyToOne(() => MovementConcept, (movementConcept) => movementConcept.id)
  @JoinColumn({ name: 'movementConceptId' })
  movementConcept: MovementConcept;

  @Column({ type: 'uuid', nullable: true })
  fromId: string;

  @ManyToOne(() => Warehouse, (warehouse) => warehouse.id)
  @JoinColumn({ name: 'fromId' })
  fromWarehouse: Warehouse;

  @Column({ type: 'uuid', nullable: true })
  toId: string;

  @ManyToOne(() => Warehouse, (warehouse) => warehouse.id)
  @JoinColumn({ name: 'toId' })
  toWarehouse: Warehouse;

  @OneToMany(
    () => InventoryMovementLote,
    (inventoryMovementLote) => inventoryMovementLote.inventoryMovement,
  )
  inventoryMovementLotes: InventoryMovementLote[];
}
