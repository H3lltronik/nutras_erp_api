import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '../../profile/entities/profile.entity';

type ProfileSeederConfig = {
  adminProfileId: string;
};

@Injectable()
export class ProfileSeederService {
  constructor(
    @InjectRepository(Profile)
    private profilesRepository: Repository<Profile>,
  ) {}

  async seed(config: ProfileSeederConfig) {
    const profiles: Profile[] = [];
    const { adminProfileId } = config;

    const profileAdmin = await this.profilesRepository.save({
      name: 'Admin',
      id: adminProfileId,
      roles: [
        'user:read',
        'user:update',
        'user:create',
        'user:delete',
        'profile:delete',
        'profile:create',
        'profile:update',
        'profile:read',
        'product:comprasForm',
        '*',
      ],
    });

    profiles.push(profileAdmin);

    return profiles;
  }
}
