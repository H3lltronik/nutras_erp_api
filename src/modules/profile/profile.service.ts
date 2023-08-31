import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { GetProfilesFilterDto } from './dto/get-profiles.post.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';
import { ProfileFiltersHandler } from './filters/profile-filters.handler';
import { Paginator } from '@/src/common/utils/paginator';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
  ) {}

  create(createProfileDto: CreateProfileDto) {
    return this.profileRepository.save(createProfileDto);
  }

  async findAll(filterDto: GetProfilesFilterDto) {
    const { name, limit, offset } = filterDto;
    const query = this.profileRepository.createQueryBuilder('profile');
    const filterHandler = new ProfileFiltersHandler();

    filterHandler.applyFilters(query, filterDto);

    const paginator = new Paginator<Profile>();
    return await paginator.paginate(query, limit, offset);
  }

  async findOne(id: string) {
    return this.profileRepository.findOne({ where: { id } });
  }

  async update(id: string, updateProfileDto: UpdateProfileDto) {
    const profile = this.profileRepository.findOne({ where: { id } });
    if (!profile) throw new Error('Profile not found');

    await this.profileRepository.update(id, updateProfileDto);

    return this.profileRepository.findOne({ where: { id } });
  }

  async remove(id: string) {
    const profile = await this.profileRepository.findOneBy({ id });
    profile.deletedAt = new Date();
    return this.profileRepository.save(profile);
  }
}
