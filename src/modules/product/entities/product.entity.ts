import { TimestampsEntity } from '@/src/common/timestamps-entity';
import { Lote } from '@/src/modules/lote/entities/lote.entity';
import { MeasureUnit } from '@/src/modules/measure_unit/entities/measure_unit.entity';
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product extends TimestampsEntity {
  @Column({ type: 'boolean', default: false })
  isDraft: boolean;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Generated('increment')
  @Column()
  partidaId: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  code: string;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  description: string;

  @JoinColumn()
  @OneToMany(() => Lote, (lote) => lote.product)
  lote?: Lote;

  @JoinColumn()
  @ManyToOne(() => MeasureUnit, (measureUnit) => measureUnit.id)
  unit: MeasureUnit;

  @Column({ type: 'uuid', nullable: true })
  unitId: string;
}
