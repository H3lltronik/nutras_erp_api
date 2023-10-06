import { TimestampsEntity } from '@/src/common/timestamps-entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class KosherDetails extends TimestampsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  agency: string;

  @Column()
  certifiedCompany: string;

  @Column()
  nameOnCertificate: string;

  @Column()
  kidOrUkd: string;

  @Column()
  certificatePageNumber: number;

  @Column()
  certificateValidity: Date;

  @OneToOne(() => Product, (product) => product.kosherDetails)
  product: Product;
}
