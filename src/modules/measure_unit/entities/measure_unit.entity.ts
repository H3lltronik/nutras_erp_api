import { TimestampsEntity } from '@/src/common/timestamps-entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../../product/entities/product.entity';

@Entity()
export class MeasureUnit extends TimestampsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @JoinColumn()
  @OneToMany(() => Product, (product) => product.id)
  product: Product;
}
