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
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product extends TimestampsEntity {
  @Column({ type: 'boolean', default: false })
  isDraft: boolean;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Generated('increment')
  @Column()
  partidaId: number;

  // Represents a unique identifier or code for an item or entity.
  @Column({ nullable: true })
  code: string;

  // Common or widely accepted name for the item.
  @Column({ nullable: true })
  commonName: string;

  // Detailed description provided by the vendor or supplier.
  @Column({ nullable: true })
  vendorDescription: string;

  // Entity or person supplying the item or service.
  @Column({ nullable: true })
  provider: string;

  // Same as 'code', may represent another unique identifier if used in context.
  @Column({ nullable: true })
  codeAlt: string; // Changed to 'codeAlt' to differentiate from the first 'code'

  // The manner in which an item is displayed or packaged.
  @Column({ nullable: true })
  presentation: string;

  // Amount or number of items.
  @Column({ nullable: true })
  quantity: number;

  // Potential allergenic ingredient or substance in the item.
  @Column({ nullable: true })
  allergen: string;

  // Current condition or phase of the item (e.g., active, inactive).
  @Column({ nullable: true })
  status: string;

  // Agency or authority responsible for kosher certification.
  @Column({ nullable: true })
  kosherAgency: string;

  // Official name of the ingredient as provided by the company.
  @Column({ nullable: true })
  companyIngredientName: string;

  // Name or title of the certificate or certification.
  @Column({ nullable: true })
  certificateName: string;

  // Alternate term for a supplier or provider.
  @Column({ nullable: true })
  vendor: string;

  // Additional information or remarks about the item.
  @Column({ nullable: true })
  note: string;

  @JoinColumn()
  @OneToMany(() => Lote, (lote) => lote.product)
  lote?: Lote;

  @JoinColumn()
  @ManyToOne(() => MeasureUnit, (measureUnit) => measureUnit.id)
  unit: MeasureUnit;

  @Column({ type: 'uuid', nullable: true })
  unitId: string;
}
