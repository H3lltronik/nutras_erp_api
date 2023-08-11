import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
  ) {}

  create(createProfileDto: CreateProfileDto) {
    return this.profileRepository.save(createProfileDto);
  }

  findAll() {
    return this.profileRepository.find();
  }

  async findOne(id: string) {
    return this.profileRepository.findOne({ where: { id } });
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return this.profileRepository.update(id, updateProfileDto);
  }

  async remove(id: string) {
    const profile = await this.profileRepository.findOneBy({ id });
    profile.deletedAt = new Date();
    return this.profileRepository.save(profile);
  }
}
