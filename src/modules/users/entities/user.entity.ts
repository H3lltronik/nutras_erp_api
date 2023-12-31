import { IDraftEntity } from '@/src/common/draft-entity';
import { TimestampsEntity } from '@/src/common/timestamps-entity';
import { Profile } from '@/src/modules/profile/entities/profile.entity';
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Department } from '../../department/entities/department.entity';

@Entity()
export class User extends TimestampsEntity implements IDraftEntity {
  @Column({ type: 'boolean', default: false })
  isDraft: boolean;

  @Column({ type: 'boolean', default: false })
  isPublished: boolean;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Generated('increment')
  @Column()
  partidaId: number;

  @Column({ unique: true, type: 'varchar', nullable: true })
  username: string;

  @Column({ unique: true, type: 'varchar', nullable: true })
  name: string;

  @Column({ type: 'text' })
  password: string;

  @ManyToOne(() => Profile, (profile) => profile.users, { cascade: true })
  @JoinColumn({ name: 'profileId' })
  profile: Profile;

  @ManyToOne(() => Department, (department) => department.users, {
    cascade: true,
  })
  @JoinColumn({ name: 'departmentId' })
  department: Department;

  @Column({ type: 'uuid', nullable: true })
  departmentId: string;

  @Column({ type: 'uuid', nullable: true })
  profileId: string;
}
