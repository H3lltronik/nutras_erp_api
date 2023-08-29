import { SelectQueryBuilder } from 'typeorm';

export interface Filter<T> {
  apply(query: SelectQueryBuilder<T>, value: any): SelectQueryBuilder<T>;
}
