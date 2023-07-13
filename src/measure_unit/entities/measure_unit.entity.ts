import { TimestampsEntity } from '@/src/common/timestamps-entity';
import { Product } from '@/src/product/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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