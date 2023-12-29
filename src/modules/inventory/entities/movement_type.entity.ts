import { TimestampsEntity } from '@/src/common/timestamps-entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'movement_type' })
export class MovementType extends TimestampsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  action: 'input' | 'output';
}
