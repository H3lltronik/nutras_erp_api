import { TimestampsEntity } from '@/src/common/timestamps-entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { InventoryMovementLote } from '../../inventory/entities/inventory_movement_lote.entity';
import { Product } from '../../product/entities/product.entity';
import { Warehouse } from '../../warehouse/entities/warehouse.entity';
import { LoteEntryType } from './lote_entry_type.entity';

@Entity()
export class Lote extends TimestampsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: string;

  @Column({ nullable: true })
  description: string;

  @Column('int', { comment: 'Cantidad de producto por lote' })
  quantity: number;

  @Column()
  expirationDate: Date;

  @Column({ type: 'uuid' })
  productId: string;

  @ManyToOne(() => Product, (product) => product.id)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column({ type: 'uuid' })
  loteEntryTypeId: string;

  @ManyToOne(() => LoteEntryType, (loteEntryType) => loteEntryType.id)
  @JoinColumn({ name: 'loteEntryTypeId' })
  loteEntryType: LoteEntryType;

  @Column({ type: 'uuid', nullable: true })
  wharehouseId: string;

  @ManyToOne(() => Warehouse, (warehouse) => warehouse.id)
  @JoinColumn({ name: 'wharehouseId' })
  warehouse: Warehouse;

  @JoinColumn()
  @OneToMany(
    () => InventoryMovementLote,
    (inventoryMovementLote) => inventoryMovementLote.lote,
  )
  inventoryMovementLote: InventoryMovementLote;
}
