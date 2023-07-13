import { TimestampsEntity } from '@/src/common/timestamps-entity';
import { User } from '@/src/users/entities/user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

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
