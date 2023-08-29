import { BaseFilterHandler } from '@/src/common/filters/BaseFilterHandler';
import { Product } from '../entities/product.entity';
import { ProductSearchFilter } from './methods/product-search.filter';

export class ProductsFiltersHandler extends BaseFilterHandler<Product> {
  protected filters = {
    search: new ProductSearchFilter(),
  };
}
