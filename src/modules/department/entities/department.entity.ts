import { TimestampsEntity } from '@/src/common/timestamps-entity';
import {
  Column,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductType } from '../../product/entities/product-type.entity';
import { Product } from '../../product/entities/product.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Department extends TimestampsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Generated('increment')
  @Column()
  partidaId: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => User, (user) => user.department)
  users: User[];

  @OneToMany(() => Product, (product) => product.department)
  products: Product[];

  @OneToMany(() => ProductType, (product) => product.department)
  productTypes: ProductType[];
}
