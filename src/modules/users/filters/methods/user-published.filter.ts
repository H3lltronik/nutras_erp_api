import { SelectQueryBuilder } from 'typeorm';
import { Filter } from '../../../types';
import { User } from '../../entities/user.entity';

export class UserPublishedFilter implements Filter<User> {
  apply(
    query: SelectQueryBuilder<User>,
    value: string,
  ): SelectQueryBuilder<User> {
    return query.andWhere('user.isPublished = :isPublished', {
      isPublished: value,
    });
  }
}
