import { IDraftEntity } from '@/src/common/draft-entity';
import { TimestampsEntity } from '@/src/common/timestamps-entity';
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PurchaseOrder } from '../../purchase_order/entities/purchase-order.entity';
import { Warehouse } from '../../warehouse/entities/warehouse.entity';
import { WorkOrder } from '../../work_order/entities/work-order.entity';
import { InventoryMovementLote } from './inventory_movement_lote.entity';
import { MovementConcept } from './movement_concept.entity';

@Entity()
export class InventoryMovement
  extends TimestampsEntity
  implements IDraftEntity
{
  @Column({ type: 'boolean', default: false })
  isDraft: boolean;

  @Column({ type: 'boolean', default: true })
  isPublished: boolean;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Generated('increment')
  @Column()
  partidaId: number;

  @Column({ nullable: true })
  folio: string;

  @Column({ nullable: true })
  ocId: string;

  @ManyToOne(() => PurchaseOrder, (purchaseOrder) => purchaseOrder.id)
  @JoinColumn({ name: 'ocId' })
  oc: PurchaseOrder;

  @Column({ nullable: true })
  ot_id: string;

  @ManyToOne(() => WorkOrder, (workOrder) => workOrder.id)
  @JoinColumn({ name: 'ot_id' })
  ot: WorkOrder;

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
