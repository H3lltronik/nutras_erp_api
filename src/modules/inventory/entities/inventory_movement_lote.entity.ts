import { TimestampsEntity } from '@/src/common/timestamps-entity';
import { Lote } from '@/src/modules/lote/entities/lote.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { InventoryMovement } from './inventory_movement.entity';

@Entity()
export class InventoryMovementLote extends TimestampsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @ManyToOne(() => Lote, (lote) => lote.id)
  lote: string;

  @Column()
  folio: string;

  @Column()
  @ManyToOne(
    () => InventoryMovement,
    (inventoryMovement) => inventoryMovement.id,
  )
  inventory_movement: string;
}
