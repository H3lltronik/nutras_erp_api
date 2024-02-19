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
import { Department } from '../../department/entities/department.entity';
import { ProductTypeCategory } from './product-type-category.entity';

@Entity()
export class ProductType extends TimestampsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Generated('increment')
  @Column()
  partidaId: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  departmentId: string;

  @JoinColumn()
  @ManyToOne(() => Department, (department) => department.id)
  department: Department;

  @JoinColumn()
  @OneToMany(() => ProductTypeCategory, (productTypeCategory) => productTypeCategory.productType)
  productTypeCategories: ProductTypeCategory[];
}
