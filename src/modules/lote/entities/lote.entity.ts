import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LoteEntryType } from './lote_entry_type.entity';
import { TimestampsEntity } from '@/src/common/timestamps-entity';
import { Product } from '../../product/entities/product.entity';

@Entity()
export class Lote extends TimestampsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: string;

  @Column()
  description: string;

  @Column()
  quantity: number;

  @Column()
  expirationDate: Date;

  @ManyToOne(() => Product, (product) => product.id)
  product: Product;

  @ManyToOne(() => LoteEntryType, (loteEntryType) => loteEntryType.id)
  lote_entry_type: LoteEntryType;
}
