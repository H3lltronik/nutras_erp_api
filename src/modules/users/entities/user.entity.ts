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

@Entity()
export class User extends TimestampsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Generated('increment')
  @Column()
  partidaId: number;

  @Column({ unique: true, type: 'varchar' })
  username: string;

  @Column({ type: 'text' })
  password: string;

  @ManyToOne(() => Profile, (profile) => profile.users, { cascade: true })
  @JoinColumn({ name: 'profileId' })
  profile: Profile;

  @Column({ type: 'uuid', nullable: true })
  profileId: string;
}
