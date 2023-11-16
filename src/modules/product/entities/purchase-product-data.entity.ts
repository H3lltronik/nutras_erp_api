import { TimestampsEntity } from '@/src/common/timestamps-entity';
import {
  Column,
  Entity,
  Generated,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class PurchaseData extends TimestampsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Generated('increment')
  @Column()
  partidaId: number;

  @Column({ nullable: true })
  allergen: string;

  @Column({ nullable: true })
  productId: string;

  @OneToOne(() => Product, (product) => product.purchaseData)
  product: Product;
}
