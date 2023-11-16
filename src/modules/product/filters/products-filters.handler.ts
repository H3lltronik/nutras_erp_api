import { BaseFilterHandler } from '@/src/common/filters/BaseFilterHandler';
import { Product } from '../entities/product.entity';
import { ProductCodeSearchFilter } from './methods/product-code-search.filter';
import { ProductDepartmentFilter } from './methods/product-department.filter';
import { ProductDraftModeFilter } from './methods/product-draft-mode.filter';
import { ProductNameSearchFilter } from './methods/product-name-search.filter';
import { ProductProviderSearchFilter } from './methods/product-provider-search.filter';
import { ProductPublishedModeFilter } from './methods/product-published-mode.filter';
import { ProductTypeFilter } from './methods/product-product-type.filter';

export class ProductsFiltersHandler extends BaseFilterHandler<Product> {
  protected filters = {
    nameSearch: new ProductNameSearchFilter(),
    codeSearch: new ProductCodeSearchFilter(),
    providerSearch: new ProductProviderSearchFilter(),
    draftMode: new ProductDraftModeFilter(),
    published: new ProductPublishedModeFilter(),
    type: new ProductTypeFilter(),
    department: new ProductDepartmentFilter(),
  };
}
