import { IDraftEntity } from '@/src/common/draft-entity';
import { TimestampsEntity } from '@/src/common/timestamps-entity';
import {
  Column,
  Entity,
  Generated,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class ProductionData extends TimestampsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Generated('increment')
  @Column()
  partidaId: number;

  @Column({ nullable: true })
  productId: string;

  @OneToOne(() => Product, (product) => product.productionData)
  product: Product;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  packaging: string;

  @Column({ nullable: true })
  mold: string;

  @Column({ nullable: true })
  ptPresentation: string;
}
