import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentModule } from '../department/department.module';
import { ProfileModule } from '../profile/profile.module';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const repositories = TypeOrmModule.forFeature([User]);

@Module({
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
  imports: [repositories, ProfileModule, DepartmentModule],
})
export class UsersModule {}
