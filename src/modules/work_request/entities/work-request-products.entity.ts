import { IDraftEntity } from '@/src/common/draft-entity';
import { TimestampsEntity } from '@/src/common/timestamps-entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { WorkRequest } from './work-request.entity';

@Entity({ name: 'work_request_product' })
export class WorkRequestProduct
  extends TimestampsEntity
  implements IDraftEntity
{
  @Column({ type: 'boolean', default: false })
  isDraft: boolean;

  @Column({ type: 'boolean', default: false })
  isPublished: boolean;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'integer', nullable: true })
  quantity: number;

  @Column({ type: 'uuid', nullable: true })
  productId: string;

  @JoinColumn()
  @ManyToOne(() => Product, (product) => product.id)
  product: Product;

  @Column({ type: 'uuid', nullable: true })
  workRequestId: string;

  @JoinColumn()
  @ManyToOne(() => WorkRequest, (workRequest) => workRequest.id)
  workRequest: WorkRequest;
}
