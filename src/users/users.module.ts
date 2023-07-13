import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { ProfileModule } from '../profile/profile.module';

const repositories = TypeOrmModule.forFeature([User]);

@Module({
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
  imports: [repositories, ProfileModule],
})
export class UsersModule {}
