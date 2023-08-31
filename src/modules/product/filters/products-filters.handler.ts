import { BaseFilterHandler } from '@/src/common/filters/BaseFilterHandler';
import { Product } from '../entities/product.entity';
import { ProductDraftModeFilter } from './methods/product-draft-mode.filter';
import { ProductSearchFilter } from './methods/product-search.filter';

export class ProductsFiltersHandler extends BaseFilterHandler<Product> {
  protected filters = {
    search: new ProductSearchFilter(),
    draftMode: new ProductDraftModeFilter(),
  };
}
