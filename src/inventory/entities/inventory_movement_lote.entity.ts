import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { InventoryMovement } from './inventory_movement.entity';
import { Lote } from '@/src/lote/entities/lote.entity';
import { TimestampsEntity } from '@/src/common/timestamps-entity';

@Entity()
export class InventoryMovementLote extends TimestampsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  @ManyToOne(() => Lote, (lote) => lote.id)
  lote: number;

  @Column()
  folio: string;

  @Column()
  @ManyToOne(
    () => InventoryMovement,
    (inventoryMovement) => inventoryMovement.id,
  )
  inventory_movement: number;
}
