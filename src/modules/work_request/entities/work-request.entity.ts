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

@Entity({ name: 'work_request' })
export class WorkRequest extends TimestampsEntity implements IDraftEntity {
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

  @Column({ type: 'text', nullable: true })
  note: string;

  @Column({ type: 'uuid', nullable: true })
  userId: string;

  @JoinColumn()
  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @JoinColumn()
  @OneToMany(() => WorkOrder, (workOrder) => workOrder.work_request)
  work_orders: WorkOrder[];
}
