import { SelectQueryBuilder } from 'typeorm';
import { Filter } from '../../../types';
import { ProductType } from '../../entities/product-type.entity';

export class ProductTypeDepartmentFilter implements Filter<ProductType> {
  apply(
    query: SelectQueryBuilder<ProductType>,
    value: string,
  ): SelectQueryBuilder<ProductType> {
    return query.andWhere('productType.departmentId = :departmentId', {
      departmentId: value,
    });
  }
}
