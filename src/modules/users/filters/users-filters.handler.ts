import { BaseFilterHandler } from '@/src/common/filters/BaseFilterHandler';
import { User } from '../entities/user.entity'; // Assuming you have a User entity
import { UserDepartmentIdFilter } from './methods/user-department-search';
import { UserDraftModeFilter } from './methods/user-draft-mode.filter';
import { UserNameFilter } from './methods/user-name-search.filter';
import { ProfileIdFilter } from './methods/user-profile-id.filter';
import { UserPublishedFilter } from './methods/user-published.filter';
import { UsernameFilter } from './methods/user-username-search.filter';

export class UserFiltersHandler extends BaseFilterHandler<User> {
  protected filters = {
    nameSearch: new UserNameFilter(),
    usernameSearch: new UsernameFilter(),
    profileId: new ProfileIdFilter(),
    departmentId: new UserDepartmentIdFilter(),
    draftMode: new UserDraftModeFilter(),
    published: new UserPublishedFilter(),
  };
}
