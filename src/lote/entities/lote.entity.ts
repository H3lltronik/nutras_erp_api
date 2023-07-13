import { Product } from '@/src/product/entities/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Lote {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  code: string;

  @Column()
  description: string;

  @Column()
  quantity: number;

  @Column()
  expirationDate: Date;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  deletedAt: Date;

  @ManyToOne(() => Product, (product) => product.id)
  product_id: Product;
}
