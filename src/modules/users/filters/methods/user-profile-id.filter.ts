import { Filter, SelectQueryBuilder } from 'typeorm';
import { User } from '../../entities/user.entity';

export class ProfileIdFilter implements Filter<User> {
  apply(
    query: SelectQueryBuilder<User>,
    value: number,
  ): SelectQueryBuilder<User> {
    return query.andWhere('profile.id = :profileId', {
      profileId: value,
    });
  }
}
