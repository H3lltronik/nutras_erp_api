import { TimestampsEntity } from '@/src/common/timestamps-entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MovementType } from './movement_type.entity';
import { Warehouse } from '../../warehouse/entities/warehouse.entity';

@Entity()
export class MovementConcept extends TimestampsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ type: 'uuid', nullable: true })
  movementTypeId: string;
  
  @ManyToOne(() => MovementType, (movementType) => movementType.id)
  @JoinColumn({ name: 'movementTypeId' })
  movementType: MovementType;

  @Column({ type: 'uuid', nullable: true })
  originWarehouseId: string;

  @ManyToOne(() => Warehouse, (warehouse) => warehouse.id)
  @JoinColumn({ name: 'originWarehouseId' })
  originWarehouse: Warehouse;

  @Column({ type: 'uuid', nullable: true })
  destinyWarehouseId: string;

  @ManyToOne(() => Warehouse, (warehouse) => warehouse.id)
  @JoinColumn({ name: 'destinyWarehouseId' })
  destinyWarehouse: Warehouse;

}
