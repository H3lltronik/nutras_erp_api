import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/create.dto';
import * as bcrypt from 'bcrypt';
import { Profile } from '../profile/entities/profile.entity';
import { UpdateUserDto } from './dtos/update.dto';
import { ProfileService } from '../profile/profile.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private profileService: ProfileService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const profile = await this.profileService.findOne(createUserDto.profileId);

    const user = new User();
    user.username = createUserDto.username;
    user.password = await bcrypt.hash(createUserDto.password, 10);
    user.profile = profile;

    return this.userRepository.save(user);
  }

  async findAll() {
    // Implementation here
  }

  async findOne(id: string) {
    return this.userRepository.findOne({ where: { id } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    // Implementation here
  }

  async remove(id: string) {
    // Implementation here
  }
}
