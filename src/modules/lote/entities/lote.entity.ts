import { TimestampsEntity } from '@/src/common/timestamps-entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { LoteEntryType } from './lote_entry_type.entity';

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

  @Column({ type: 'uuid', nullable: true })
  productId: string;

  @ManyToOne(() => Product, (product) => product.id)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column({ type: 'uuid', nullable: true })
  loteEntryTypeId: string;

  @ManyToOne(() => LoteEntryType, (loteEntryType) => loteEntryType.id)
  @JoinColumn({ name: 'loteEntryTypeId' })
  lote_entry_type: LoteEntryType;
}
