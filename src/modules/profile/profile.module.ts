import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';

const repositories = TypeOrmModule.forFeature([Profile]);

@Module({
  controllers: [ProfileController],
  providers: [ProfileService],
  imports: [repositories],
  exports: [ProfileService],
})
export class ProfileModule {}
