import { TimestampsEntity } from '@/src/common/timestamps-entity';
import { Lote } from '@/src/lote/entities/lote.entity';
import { MeasureUnit } from '@/src/measure_unit/entities/measure_unit.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product extends TimestampsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  code: string;

  @Column()
  type: string;

  @Column()
  description: string;

  @JoinColumn()
  @OneToMany(() => Lote, (lote) => lote.product)
  lote: Lote;

  @JoinColumn()
  @ManyToOne(() => MeasureUnit, (measureUnit) => measureUnit.id)
  unit: MeasureUnit;
}
