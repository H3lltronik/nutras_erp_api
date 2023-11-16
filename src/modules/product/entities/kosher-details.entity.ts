import { TimestampsEntity } from '@/src/common/timestamps-entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class KosherDetails extends TimestampsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  agency: string;

  @Column({ nullable: true })
  certifiedCompany: string;

  @Column({ nullable: true })
  nameOnCertificate: string;

  @Column({ nullable: true })
  kidOrUkd: string;

  @Column({ nullable: true })
  certificatePageNumber: number;

  @Column({ nullable: true })
  certificateValidity: Date;

  @OneToOne(() => Product, (product) => product.kosherDetails)
  product: Product;
}
