import { BaseFilterHandler } from '@/src/common/filters/BaseFilterHandler';
import { Product } from '../entities/product.entity';

export class ProductsFiltersHandler extends BaseFilterHandler<Product> {
  protected filters = {};
}
