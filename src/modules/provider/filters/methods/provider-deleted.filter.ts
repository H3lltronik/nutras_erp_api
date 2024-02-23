import { SelectQueryBuilder } from 'typeorm';
import { Filter } from '../../../types';
import { Provider } from '../../entities/provider.entity';

export class ProviderDeletedFilter implements Filter<Provider> {
  apply(
    query: SelectQueryBuilder<Provider>,
    value: string,
  ): SelectQueryBuilder<Provider> {
    if (value === 'true' || value === '1') {
      return query.andWhere('provider.deletedAt IS NOT NULL');
    }
    return query.andWhere('provider.deletedAt IS NULL');
  }
}
