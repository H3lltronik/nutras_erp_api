import { Injectable } from '@nestjs/common';
import { User } from '../../users/entities/user.entity';
import { UsersService } from '../../users/users.service';

type UsersSeederConfig = {
  directionDepartmentId: string;
  adminProfileId: string;
};

@Injectable()
export class UserSeederService {
  constructor(private usersService: UsersService) {}

  async seed(config: UsersSeederConfig) {
    console.log('Seeding users...');

    const { directionDepartmentId, adminProfileId } = config;
    const users: User[] = [];

    const userAdmin = await this.usersService.create({
      departmentId: directionDepartmentId,
      name: 'Admin',
      password: 'password',
      username: 'admin.nutras@gmail.com',
      profileId: adminProfileId,
    });
    users.push(userAdmin);

    return users;
  }
}
