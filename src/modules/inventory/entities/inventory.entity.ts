import { TimestampsEntity } from '@/src/common/timestamps-entity';
import { Lote } from '@/src/modules/lote/entities/lote.entity';
import { Warehouse } from '@/src/modules/warehouse/entities/warehouse.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Inventory extends TimestampsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @ManyToOne(() => Lote, (lote) => lote.id)
  lote: string;

  @Column()
  @ManyToOne(() => Warehouse, (warehouse) => warehouse.id)
  warehouse: string;

  @Column()
  quantity: string;
}
