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
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  code: string;

  @Column()
  type: string;

  @Column()
  description: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  deletedAt: Date;

  @JoinColumn()
  @OneToMany(() => Lote, (lote) => lote.product)
  lote: Lote;

  @JoinColumn()
  @ManyToOne(() => MeasureUnit, (measureUnit) => measureUnit.id)
  unit: MeasureUnit;
}
