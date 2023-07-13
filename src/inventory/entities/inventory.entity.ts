import { Lote } from '@/src/lote/entities/lote.entity';
import { Warehouse } from '@/src/warehouse/entities/warehouse.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Inventory {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  @ManyToOne(() => Lote, (lote) => lote.id)
  lote_id: number;

  @Column()
  @ManyToOne(() => Warehouse, (warehouse) => warehouse.id)
  warehouse_id: number;

  @Column()
  quantity: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  deletedAt: Date;
}
