import { SelectQueryBuilder } from 'typeorm';
import { Filter } from '../../../types';
import { Product } from '../../entities/product.entity';

export class ProductProviderSearchFilter implements Filter<Product> {
  apply(
    query: SelectQueryBuilder<Product>,
    value: string,
  ): SelectQueryBuilder<Product> {
    return query.andWhere('LOWER(provider.name) LIKE LOWER(:search)', {
      search: `%${value}%`,
    });
  }
}
