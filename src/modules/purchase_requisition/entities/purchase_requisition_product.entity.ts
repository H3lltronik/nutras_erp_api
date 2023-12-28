import { IDraftEntity } from '@/src/common/draft-entity';
import { TimestampsEntity } from '@/src/common/timestamps-entity';
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { PurchaseRequisition } from './purchase_requisition.entity';

@Entity({ name: 'purchase_requisition_product' })
export class PurchaseRequisitionProduct
  extends TimestampsEntity
  implements IDraftEntity
{
  @Column({ type: 'boolean', default: false })
  isDraft: boolean;

  @Column({ type: 'boolean', default: false })
  isPublished: boolean;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Generated('increment')
  @Column()
  partidaId: number;

  @Column({ nullable: true })
  product_id: string;

  @JoinColumn({ name: 'product_id' })
  @ManyToOne(() => Product, (product) => product.id)
  product: Product;

  @Column({ nullable: true })
  quantity: number;

  @Column({ nullable: true })
  purchase_requisition_id: string;

  @JoinColumn({ name: 'purchase_requisition_id' })
  @ManyToOne(
    () => PurchaseRequisition,
    (purchaseRequisition) => purchaseRequisition.id,
  )
  purchase_requisition: PurchaseRequisition;
}
