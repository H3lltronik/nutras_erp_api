import { Lote } from '@/src/lote/entities/lote.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  code: string;

  @Column()
  type: string;

  @Column()
  description: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  deletedAt: Date;

  @OneToOne(() => Lote, (lote) => lote.product_id)
  lote_id: Lote;
}
