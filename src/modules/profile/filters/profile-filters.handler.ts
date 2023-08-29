import { BaseFilterHandler } from '@/src/common/filters/BaseFilterHandler';
import { Profile } from '../entities/profile.entity';

export class ProfileFiltersHandler extends BaseFilterHandler<Profile> {
  protected filters = {};
}
