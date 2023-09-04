import { Filter, SelectQueryBuilder } from 'typeorm';
import { User } from '../../entities/user.entity';

export class UserNameFilter implements Filter<User> {
  apply(
    query: SelectQueryBuilder<User>,
    value: number,
  ): SelectQueryBuilder<User> {
    return query.andWhere('LOWER(user.name) LIKE LOWER(:name)', {
      name: `%${value}%`,
    });
  }
}
