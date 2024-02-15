import { SelectQueryBuilder } from 'typeorm';
import { Filter } from '../../../types';
import { Product } from '../../entities/product.entity';

export class ProductAllergenFilter implements Filter<Product> {
  apply(
    query: SelectQueryBuilder<Product>,
    value: string,
  ): SelectQueryBuilder<Product> {
    return query.andWhere('product.allergen = :allergen', {
      allergen: value,
    });
  }
}
