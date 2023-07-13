import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LoteEntryType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  deletedAt: Date;
}
