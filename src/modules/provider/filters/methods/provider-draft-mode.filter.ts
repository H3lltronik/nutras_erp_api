import { SelectQueryBuilder } from 'typeorm';
import { Filter } from '../../../types';
import { Provider } from '../../entities/provider.entity';

export class ProviderDraftModeFilter implements Filter<Provider> {
  apply(
    query: SelectQueryBuilder<Provider>,
    value: string,
  ): SelectQueryBuilder<Provider> {
    return query.andWhere('provider.isDraft = :isDraft', {
      isDraft: value,
    });
  }
}
