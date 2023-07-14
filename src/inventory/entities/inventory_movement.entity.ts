import { TimestampsEntity } from '@/src/common/timestamps-entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class InventoryMovement extends TimestampsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;

  @Column()
  quantity: number;

  // @ManyToOne(() => , (inventoryMovement) => inventoryMovement.id)
  @Column({ nullable: true })
  ot_id: string;

  @Column({ type: 'text', nullable: true })
  reason: string;

  @Column()
  from: string;

  @Column()
  to: string;
}
