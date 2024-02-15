import { SelectQueryBuilder } from 'typeorm';
import { Filter } from '../../../types';
import { Product } from '../../entities/product.entity';

export class ProductDeletedFilter implements Filter<Product> {
  apply(
    query: SelectQueryBuilder<Product>,
    value: string,
  ): SelectQueryBuilder<Product> {
    if (value === 'true' || value === '1') {
      return query.andWhere('product.deletedAt IS NOT NULL');
    }
    return query.andWhere('product.deletedAt IS NULL');
  }
}
