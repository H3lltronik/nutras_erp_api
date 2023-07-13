import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { InventoryMovement } from './inventory_movement.entity';
import { Lote } from '@/src/lote/entities/lote.entity';

@Entity()
export class InventoryMovementLote {
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

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  deletedAt: Date;
}
