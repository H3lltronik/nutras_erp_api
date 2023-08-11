import { TimestampsEntity } from '@/src/common/timestamps-entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Profile extends TimestampsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, type: 'varchar' })
  name: string;

  @Column({ type: 'text', array: true }) // changed to array of text
  roles: string[];

  @OneToOne(() => User, (user) => user.profile)
  user: User;
}
