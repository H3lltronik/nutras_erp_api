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
import { User } from '../../users/entities/user.entity';
import { WorkOrder } from '../../work_order/entities/work-order.entity';
import { PurchaseRequisitionProduct } from './purchase_requisition_product.entity';

@Entity({ name: 'purchase_requisition' })
export class PurchaseRequisition
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
  work_order_id: string;

  @JoinColumn({ name: 'work_order_id' })
  @ManyToOne(() => WorkOrder, (workOrder) => workOrder.id)
  work_orders: WorkOrder;

  @Column({ nullable: true })
  user_id: string;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Column({ nullable: true })
  motive: string;

  @JoinColumn()
  @OneToMany(
    () => PurchaseRequisitionProduct,
    (purchaseRequisitionProduct) =>
      purchaseRequisitionProduct.purchase_requisition,
  )
  purchase_requisition_products: PurchaseRequisitionProduct[];
}
