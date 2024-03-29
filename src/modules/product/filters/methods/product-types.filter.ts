import { SelectQueryBuilder } from 'typeorm';
import { Filter } from '../../../types';
import { Product } from '../../entities/product.entity';

export class ProductTypesFilter implements Filter<Product> {
  apply(
    query: SelectQueryBuilder<Product>,
    value: string,
  ): SelectQueryBuilder<Product> {
    return query.andWhere('product.productTypeId in(:...types)', {
      types: JSON.parse(value),
    });
  }
}
