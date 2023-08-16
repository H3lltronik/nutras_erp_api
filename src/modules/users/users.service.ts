import { encryptPassword } from '@/src/common/utils/password';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileService } from '../profile/profile.service';
import { CreateUserDto } from './dtos/create.dto';
import { UpdateUserDto } from './dtos/update.dto';
import { User } from './entities/user.entity';

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
    user.password = await encryptPassword(createUserDto.password);
    user.profile = profile;

    try {
      return await this.userRepository.save(user);
    } catch (error) {
      console.log(error);
      if (error.code === '23505')
        throw new HttpException('Username already exists', HttpStatus.CONFLICT);
    }
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: string) {
    return this.userRepository.findOne({ where: { id } });
  }

  async findOneByUsername(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    // Implementation here
  }

  async remove(id: string) {
    // Implementation here
  }
}
