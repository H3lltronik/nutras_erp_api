import { TimestampsEntity } from '@/src/common/timestamps-entity';
import { Column, Entity, Generated, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Profile extends TimestampsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Generated('increment')
  @Column()
  partidaId: number;

  @Column({ unique: true, type: 'varchar' })
  name: string;

  @Column({ type: 'text', array: true })
  roles: string[];

  @OneToMany(() => User, (user) => user.profile)
  users: User[];
}
