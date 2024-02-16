import { BaseFilterHandler } from '@/src/common/filters/BaseFilterHandler';
import { Product } from '../entities/product.entity';
import { ProductAllergenFilter } from './methods/product-allergen.filter';
import { ProductCodeSearchFilter } from './methods/product-code-search.filter';
import { ProductDeletedFilter } from './methods/product-deleted.filter';
import { ProductDepartmentFilter } from './methods/product-department.filter';
import { ProductDraftModeFilter } from './methods/product-draft-mode.filter';
import { ProductKosherFilter } from './methods/product-kosher.filter';
import { ProductNameSearchFilter } from './methods/product-name-search.filter';
import { ProductTypeFilter } from './methods/product-product-type.filter';
import { ProductProviderSearchFilter } from './methods/product-provider-search.filter';
import { ProductPublishedModeFilter } from './methods/product-published-mode.filter';
import { ProductTypesFilter } from './methods/product-types.filter';
import { ProductPresentationsFilter } from './methods/product-presentations.filter';

export class ProductsFiltersHandler extends BaseFilterHandler<Product> {
  protected filters = {
    nameSearch: new ProductNameSearchFilter(),
    codeSearch: new ProductCodeSearchFilter(),
    providerSearch: new ProductProviderSearchFilter(),
    kosher: new ProductKosherFilter(),
    allergen: new ProductAllergenFilter(),
    productTypes: new ProductTypesFilter(),
    presentations: new ProductPresentationsFilter(),
    draftMode: new ProductDraftModeFilter(),
    published: new ProductPublishedModeFilter(),
    deleted: new ProductDeletedFilter(),
    type: new ProductTypeFilter(),
    department: new ProductDepartmentFilter(),
  };
}
