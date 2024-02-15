import { SelectQueryBuilder } from 'typeorm';
import { Filter } from '../../../types';
import { Provider } from '../../entities/provider.entity';

export class ProviderNameSearchFilter implements Filter<Provider> {
  apply(
    query: SelectQueryBuilder<Provider>,
    value: string,
  ): SelectQueryBuilder<Provider> {
    return query.andWhere('LOWER(provider.name) LIKE LOWER(:search)', {
      search: `%${value}%`,
    });
  }
}
