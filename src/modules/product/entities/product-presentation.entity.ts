import { TimestampsEntity } from '@/src/common/timestamps-entity';
import {
  Column,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ProductPresentation extends TimestampsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Generated('increment')
  @Column()
  partidaId: number;

  @Column()
  name: string;
}
