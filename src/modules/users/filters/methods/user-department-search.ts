import { Filter, SelectQueryBuilder } from 'typeorm';
import { User } from '../../entities/user.entity';

export class UserDepartmentIdFilter implements Filter<User> {
  apply(
    query: SelectQueryBuilder<User>,
    value: number,
  ): SelectQueryBuilder<User> {
    return query.andWhere('department.id = :departmentId', {
      departmentId: value,
    });
  }
}
