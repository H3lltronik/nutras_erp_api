import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductType } from '../../product/entities/product-type.entity';

type ProductTypeSeederConfig = {
  productionDepartmentId: string;
  purchasesDepartmentId: string;
  productTypePTId: string;
  productTypePPId: string;
};

@Injectable()
export class ProductTypeSeederService {
  constructor(
    @InjectRepository(ProductType)
    private productTypesRepository: Repository<ProductType>,
  ) {}

  async seed(config: ProductTypeSeederConfig) {
    console.log('Seeding product types..');
    const {
      productionDepartmentId,
      purchasesDepartmentId,
      productTypePTId,
      productTypePPId,
    } = config;

    return await this.productTypesRepository.save([
      { name: 'MP', departmentId: purchasesDepartmentId },
      { name: 'PT', departmentId: productionDepartmentId, id: productTypePTId },
      { name: 'PP', departmentId: productionDepartmentId, id: productTypePPId },
    ]);
  }
}
