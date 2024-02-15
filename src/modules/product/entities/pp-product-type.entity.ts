import { TimestampsEntity } from '@/src/common/timestamps-entity';
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class PPProductType extends TimestampsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Generated('increment')
  @Column()
  partidaId: number;

  @Column()
  mask: string;

  @Column()
  prefix: string;

  @Column()
  suffix: string;

  @JoinColumn()
  @OneToMany(() => Product, (product) => product.ppCategory)
  products: Product[];
}
