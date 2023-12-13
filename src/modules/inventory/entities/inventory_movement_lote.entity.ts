import { IDraftEntity } from '@/src/common/draft-entity';
import { TimestampsEntity } from '@/src/common/timestamps-entity';
import { Lote } from '@/src/modules/lote/entities/lote.entity';
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { InventoryMovement } from './inventory_movement.entity';

@Entity()
export class InventoryMovementLote
  extends TimestampsEntity
  implements IDraftEntity
{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'boolean', default: false })
  isDraft: boolean;

  @Column({ type: 'boolean', default: false })
  isPublished: boolean;

  @Generated('increment')
  @Column()
  partidaId: number;

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
