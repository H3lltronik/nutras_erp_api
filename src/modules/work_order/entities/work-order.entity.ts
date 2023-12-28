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
import { User } from '../../users/entities/user.entity';
import { WorkRequest } from '../../work_request/entities/work-request.entity';
import { WorkOrderServiceType } from './work-order-service-type.entity';

@Entity({ name: 'work_order' })
export class WorkOrder extends TimestampsEntity implements IDraftEntity {
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
  clientRequestDate: Date;

  @Column({ nullable: true })
  internDueDate: Date;

  @Column({ type: 'uuid', nullable: true })
  userId: string;

  @JoinColumn({ name: 'userId' })
  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Column({ type: 'uuid', nullable: true })
  productId: string;

  @JoinColumn({ name: 'productId' })
  @ManyToOne(() => Product, (product) => product.id)
  product: Product;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'uuid', nullable: true })
  service_type_id: string;

  @JoinColumn({ name: 'service_type_id' })
  @ManyToOne(() => WorkOrderServiceType, (service_type) => service_type.id)
  service_type: WorkOrderServiceType;

  @Column({ type: 'uuid', nullable: true })
  work_request_id: string;

  @JoinColumn({ name: 'work_request_id' })
  @ManyToOne(() => WorkRequest, (work_request) => work_request.id)
  work_request: WorkRequest;
}
