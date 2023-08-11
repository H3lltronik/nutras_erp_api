import { TimestampsEntity } from '@/src/common/timestamps-entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LoteEntryType extends TimestampsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}
