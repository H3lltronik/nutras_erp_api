import { TimestampsEntity } from '@/src/common/timestamps-entity';
import { Lote } from '@/src/lote/entities/lote.entity';
import { Warehouse } from '@/src/warehouse/entities/warehouse.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Inventory extends TimestampsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  @ManyToOne(() => Lote, (lote) => lote.id)
  lote: number;

  @Column()
  @ManyToOne(() => Warehouse, (warehouse) => warehouse.id)
  warehouse: number;

  @Column()
  quantity: number;
}