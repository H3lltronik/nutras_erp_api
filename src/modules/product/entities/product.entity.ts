import { IDraftEntity } from '@/src/common/draft-entity';
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
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Department } from '../../department/entities/department.entity';
import { Provider } from '../../provider/entities/provider.entity';
import { KosherDetails } from './kosher-details.entity';
import { ProductType } from './product-type.entity';
import { ProductionData } from './production-product-data.entity';
import { PurchaseData } from './purchase-product-data.entity';
import { ProductTypeCategory } from './product-type-category.entity';

@Entity()
export class Product extends TimestampsEntity implements IDraftEntity {
  @Column({ type: 'boolean', default: false })
  isDraft: boolean;

  @Column({ type: 'boolean', default: false })
  isPublished: boolean;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Generated('increment')
  @Column()
  partidaId: number;

  @Column({ nullable: true })
  productTypeId: string;

  @JoinColumn()
  @ManyToOne(() => ProductType, (productType) => productType.id)
  productType: ProductType;

  @Column({ nullable: true, unique: true })
  code: string;

  @Column({ nullable: true })
  commonName: string;

  @Column({ nullable: true })
  providerId: string;

  @Column({ nullable: true })
  providerDescription: string;

  @Column({ nullable: true })
  notes: string;

  @Column({ nullable: true, type: 'text' })
  ppNotes: string;

  @JoinColumn()
  @ManyToOne(() => Provider, (provider) => provider.id)
  provider: Provider;

  @Column({ type: 'uuid', nullable: true })
  unitId: string;

  @Column({ nullable: true })
  presentation: string;

  @Column({ nullable: true })
  quantityPerUnit: string;

  @JoinColumn()
  @ManyToOne(() => MeasureUnit, (measureUnit) => measureUnit.id)
  unit: MeasureUnit;

  @Column({ nullable: true, default: false })
  isKosher: boolean;

  @Column({ nullable: true })
  ppCategoryId: string;

  @Column({ nullable: true, default: false })
  allergen: boolean;

  @JoinColumn()
  @OneToOne(() => KosherDetails, (kosherDetails) => kosherDetails.product, {
    cascade: true,
  })
  kosherDetails?: KosherDetails;

  @JoinColumn()
  @OneToMany(() => Lote, (lote) => lote.product)
  lote?: Lote;

  @JoinColumn()
  @OneToOne(() => PurchaseData, (purchaseData) => purchaseData.product, {
    cascade: true,
  })
  purchaseData: PurchaseData;

  @JoinColumn()
  @OneToOne(() => ProductionData, (productionData) => productionData.product, {
    cascade: true,
  })
  productionData: ProductionData;

  @Column({ nullable: true })
  departmentId: string;

  @JoinColumn()
  @ManyToOne(() => Department, (department) => department.id)
  department: Department;

  @OneToMany(() => Lote, (lote) => lote.product)
  lotes: Lote[];

  @Column({ nullable: true })
  productTypeCategoryId: string;

  @JoinColumn()
  @ManyToOne(() => ProductTypeCategory, (productTypeCategory) => productTypeCategory.id, {
    nullable: true,
  })
  ppCategory: ProductTypeCategory;
}
