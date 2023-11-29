import { TimestampsEntity } from '@/src/common/timestamps-entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { InventoryMovement } from '../../inventory/entities/inventory_movement.entity';

@Entity()
export class Warehouse extends TimestampsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @OneToMany(
    () => InventoryMovement,
    (inventoryMovement) => inventoryMovement.fromId,
  )
  fromInventoryMovements: InventoryMovement[];

  @OneToMany(
    () => InventoryMovement,
    (inventoryMovement) => inventoryMovement.toId,
  )
  toInventoryMovements: InventoryMovement[];
}
