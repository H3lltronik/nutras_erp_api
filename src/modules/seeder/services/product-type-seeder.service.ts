import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductType } from '../../product/entities/product-type.entity';
import { ProductTypeCategoryService } from '../../product/services/product-type-category.service';

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
    private productTypeCategoryService: ProductTypeCategoryService,
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
        departmentId: purchasesDepartmentId,
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
        id: productTypePPId,
        productTypeCategories: [
          {
            name: '(PP-###) Núcleos',
            mask: 'PP-###-',
            prefix: 'PP',
            suffix: '',
            productTypeId: productTypePPId,
          },
          {
            name: '(PP-###-R) Núcleo recuperado',
            mask: 'PP-###-R',
            prefix: 'PP',
            suffix: 'R',
            productTypeId: productTypePPId,
          },
          {
            name: '(PP-###-N) Núcleo NO conforme',
            mask: 'PP-###-N',
            prefix: 'PP',
            suffix: 'N',
            productTypeId: productTypePPId,
          },
          {
            name: '(PP-###-A) Núcleo transformado',
            mask: 'PP-###-A',
            prefix: 'PP',
            suffix: 'A',
            productTypeId: productTypePPId,
          },
          {
            name: '(PP-###-AR) Núcleo transformado recuperado',
            mask: 'PP-###-AR',
            prefix: 'PP',
            suffix: 'AR',
            productTypeId: productTypePPId,
          },
          {
            name: '(PP-###-AN) Núcleo transformado NO conforme',
            mask: 'PP-###-AN',
            prefix: 'PP',
            suffix: 'AN',
            productTypeId: productTypePPId,
          },
        ],
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
      const categories = productType.productTypeCategories;
      delete productType.productTypeCategories;
      let productTypeEntity = await this.productTypesRepository.findOne({
        where: { name: productType.name },
      });
      if (!productTypeEntity) {
        productTypeEntity = await this.productTypesRepository.save(productType);
      } else {
        await this.productTypesRepository.update(productTypeEntity.id, productType);
      }
      if (categories) {
        for (const category of categories) {
          const productTypeCategory = {
            ...category,
            productTypeId: productTypeEntity.id,
          };
          await this.productTypeCategoryService.autoUpdate(productTypeCategory);
        }
      }
      productTypesSaved.push(productType);
    }
    return productTypesSaved;
  }
}
