import { IDraftEntity } from '@/src/common/draft-entity';
import { TimestampsEntity } from '@/src/common/timestamps-entity';
import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Provider extends TimestampsEntity implements IDraftEntity {
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
  name: string;

  @Column({ nullable: true })
  businessName: string;

  @Column({ nullable: true })
  service: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  paymentEmail: string;

  @Column({ nullable: true })
  bank: string;

  @Column({ nullable: true })
  clabeAccount: string;

  @Column({ nullable: true })
  accountNumber: string;
}
