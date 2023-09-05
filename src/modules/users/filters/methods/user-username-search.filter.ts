import { SelectQueryBuilder } from 'typeorm';
import { Filter } from '../../../types';
import { User } from '../../entities/user.entity';

export class UsernameFilter implements Filter<User> {
  apply(
    query: SelectQueryBuilder<User>,
    value: string,
  ): SelectQueryBuilder<User> {
    return query.andWhere('LOWER(user.username) LIKE LOWER(:username)', {
      username: `%${value}%`,
    });
  }
}
