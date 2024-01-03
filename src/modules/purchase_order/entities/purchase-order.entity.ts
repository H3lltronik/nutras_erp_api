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
import { WorkOrder } from '../../work_order/entities/work-order.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class PurchaseOrder extends TimestampsEntity {
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
  folio: string;

  @Column({ nullable: true })
  workOrderId: string;

  @JoinColumn({ name: 'workOrderId' })
  @ManyToOne(() => WorkOrder, (workOrder) => workOrder.id)
  workOrder: WorkOrder;

  @Column({ nullable: true })
  userId: string;

  @JoinColumn({ name: 'userId' })
  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Column({ nullable: false })
  motive: string;

  // @JoinColumn()
  // @OneToMany(
  //   () => PurchaseRequisitionProduct,
  //   (purchaseRequisitionProduct) =>
  //     purchaseRequisitionProduct.purchase_requisition,
  // )
  // purchase_requisition_products: PurchaseRequisitionProduct[];
}
