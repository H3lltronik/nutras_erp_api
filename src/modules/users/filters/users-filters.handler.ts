import { BaseFilterHandler } from '@/src/common/filters/BaseFilterHandler';
import { User } from '../entities/user.entity'; // Assuming you have a User entity
import { UsernameFilter } from './methods/username.filter';
import { ProfileIdFilter } from './methods/profile-id.filter';

export class UserFiltersHandler extends BaseFilterHandler<User> {
  protected filters = {
    username: new UsernameFilter(),
    profileId: new ProfileIdFilter(),
  };
}
