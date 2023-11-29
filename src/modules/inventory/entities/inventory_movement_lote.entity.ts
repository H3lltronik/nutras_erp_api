import { TimestampsEntity } from '@/src/common/timestamps-entity';
import { Lote } from '@/src/modules/lote/entities/lote.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { InventoryMovement } from './inventory_movement.entity';

@Entity()
export class InventoryMovementLote extends TimestampsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Lote, (lote) => lote.id)
  lote: Lote;

  @Column()
  folio: string;

  @Column({ default: 0 })
  quantity: number;

  @ManyToOne(
    () => InventoryMovement,
    (inventoryMovement) => inventoryMovement.id,
  )
  inventoryMovement: string;
}
