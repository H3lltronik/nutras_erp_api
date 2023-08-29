// handlers/base-filter.handler.ts

import { Filter } from '@/src/modules/types';
import { SelectQueryBuilder } from 'typeorm';

export abstract class BaseFilterHandler<T> {
  protected filters: { [key: string]: Filter<T> } = {};

  applyFilters(
    query: SelectQueryBuilder<T>,
    filterDto: any,
  ): SelectQueryBuilder<T> {
    Object.keys(filterDto).forEach((key) => {
      if (this.filters[key] && filterDto[key]) {
        this.filters[key].apply(query, filterDto[key]);
      }
    });
    return query;
  }
}
