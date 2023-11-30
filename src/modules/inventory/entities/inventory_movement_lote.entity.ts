import { TimestampsEntity } from '@/src/common/timestamps-entity';
import { Lote } from '@/src/modules/lote/entities/lote.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { InventoryMovement } from './inventory_movement.entity';

@Entity()
export class InventoryMovementLote extends TimestampsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: true })
  loteId: string;

  @ManyToOne(() => Lote, (lote) => lote.id)
  lote: Lote;

  @Column()
  folio: string;

  @Column({ default: 0 })
  quantity: number;

  @Column({ type: 'uuid', nullable: true })
  inventoryMovementId: string;

  @ManyToOne(
    () => InventoryMovement,
    (inventoryMovement) => inventoryMovement.id,
  )
  @JoinColumn({ name: 'inventoryMovementId' })
  inventoryMovement: string;
}
