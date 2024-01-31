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

    const productTypes = [
      {
        name: 'MP',
        description: '(MP) Materia prima',
        departmentId: purchasesDepartmentId
      },
      {
        name: 'PT',
        description: '(PT) Producto terminado',
        departmentId: productionDepartmentId,
        id: productTypePTId
      },
      {
        name: 'PP',
        description: '(PP) Producto parcialmente procesado',
        departmentId: productionDepartmentId,
        id: productTypePPId
      },
      {
        name: 'ME',
        description: '(ME) Material de empaque',
        departmentId: purchasesDepartmentId
      },
      {
        name: 'PQ',
        description: '(PQ) Productos químicos',
        departmentId: purchasesDepartmentId
      },
      {
        name: 'PC',
        description: '(PC) Productos de calidad',
        departmentId: purchasesDepartmentId
      },
      {
        name: 'HE',
        description: '(HE) Herramientas',
        departmentId: purchasesDepartmentId
      },
      {
        name: 'RE',
        description: '(RE) Refacciones',
        departmentId: purchasesDepartmentId
      },
      {
        name: 'PS',
        description: '(PS) Productos de seguridad',
        departmentId: purchasesDepartmentId
      },
    ];
    let productTypesSaved = [];
    for (const productType of productTypes) {
      const productTypeEntity = await this.productTypesRepository.findOne({
        where: { name: productType.name },
      });
      if (!productTypeEntity) {
        await this.productTypesRepository.save(productType);
      } else {
        await this.productTypesRepository.update(productTypeEntity.id, productType);
      }
      productTypesSaved.push(productType);
    }
    return productTypesSaved;
  }
}
