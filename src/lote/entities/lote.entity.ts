import { Product } from '@/src/product/entities/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LoteEntryType } from './lote_entry_type.entity';

@Entity()
export class Lote {
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

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  deletedAt: Date;

  @ManyToOne(() => Product, (product) => product.id)
  product_id: Product;

  @ManyToOne(() => LoteEntryType, (loteEntryType) => loteEntryType.id)
  lote_entry_type: LoteEntryType;
}
