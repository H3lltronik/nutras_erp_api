import { TimestampsEntity } from '@/src/common/timestamps-entity';
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { ProductType } from './product-type.entity';

@Entity()
export class ProductTypeCategory extends TimestampsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Generated('increment')
  @Column()
  partidaId: number;

  @Column()
  name: string;

  @Column()
  mask: string;

  @Column()
  prefix: string;

  @Column()
  suffix: string;

  @Column()
  productTypeId: string;

  @JoinColumn()
  @ManyToOne(() => ProductType, (productType) => productType.id)
  productType: ProductType;

  @JoinColumn()
  @OneToMany(() => Product, (product) => product.productTypeCategory)
  products: Product[];
}
