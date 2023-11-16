import { BaseFilterHandler } from '@/src/common/filters/BaseFilterHandler';
import { ProductType } from '../entities/product-type.entity';
import { ProductTypeDepartmentFilter } from './methods/product-type-department.filter';

export class ProductTypesFiltersHandler extends BaseFilterHandler<ProductType> {
  protected filters = {
    department: new ProductTypeDepartmentFilter(),
  };
}
