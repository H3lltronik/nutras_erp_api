// user entity, using typeorm

import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true, type: 'varchar' })
  name: string;

  @Column({ type: 'text', array: true }) // changed to array of text
  roles: string[];

  @OneToOne(() => User, (user) => user.profile)
  user: User;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ nullable: true })
  deletedAt: Date;
}
