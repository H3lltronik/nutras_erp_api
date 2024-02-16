import { SelectQueryBuilder } from 'typeorm';
import { Filter } from '../../../types';
import { Product } from '../../entities/product.entity';

export class ProductPresentationsFilter implements Filter<Product> {
  apply(
    query: SelectQueryBuilder<Product>,
    value: string,
  ): SelectQueryBuilder<Product> {
    return query.andWhere('product.presentation in(:...presentations)', {
      presentations: JSON.parse(value),
    });
  }
}
