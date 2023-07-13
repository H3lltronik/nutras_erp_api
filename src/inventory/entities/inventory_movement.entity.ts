import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class InventoryMovement {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  type: string;

  @Column()
  quantity: number;

  @Column()
  from: string;

  @Column()
  to: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  deletedAt: Date;
}
