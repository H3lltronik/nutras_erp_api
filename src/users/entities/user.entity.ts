import { TimestampsEntity } from '@/src/common/timestamps-entity';
import { Profile } from '@/src/profile/entities/profile.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User extends TimestampsEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true, type: 'varchar' })
  username: string;

  @Column({ type: 'text' })
  password: string;

  @OneToOne(() => Profile, (profile) => profile.user, { cascade: true })
  @JoinColumn()
  profile: Profile;
}
