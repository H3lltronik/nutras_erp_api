import { TimestampsEntity } from '@/src/common/timestamps-entity';
import { Lote } from '@/src/modules/lote/entities/lote.entity';
import { MeasureUnit } from '@/src/modules/measure_unit/entities/measure_unit.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product extends TimestampsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: string;

  @Column({ nullable: true })
  type: string;

  @Column()
  description: string;

  @JoinColumn()
  @OneToMany(() => Lote, (lote) => lote.product)
  lote?: Lote;

  @JoinColumn()
  @ManyToOne(() => MeasureUnit, (measureUnit) => measureUnit.id)
  unit: MeasureUnit;
}
