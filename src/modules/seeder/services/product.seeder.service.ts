import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../product/entities/product.entity';

type ProductSeederConfig = {
  kosherDetailsId: string;
  productionDataId: string;
  purchaseDataId: string;
  providerIds: string[];
  unitIds: string[];
  productTypeIds: string[];
  deparmentIds: string[];
};

@Injectable()
export class ProductSeederService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async seed(config: ProductSeederConfig) {
    console.log('Seeding products...');
    const {
      kosherDetailsId,
      productionDataId,
      purchaseDataId,
      providerIds,
      unitIds,
      productTypeIds,
      deparmentIds,
    } = config;

    const providerId = faker.helpers.arrayElement(providerIds);
    const unitId = faker.helpers.arrayElement(unitIds);
    const productTypeId = faker.helpers.arrayElement(productTypeIds);
    const departmentId = faker.helpers.arrayElement(deparmentIds);

    const data = {
      isDraft: faker.datatype.boolean(),
      isPublished: faker.datatype.boolean(),
      productTypeId,
      code: faker.string.alpha(10),
      commonName: faker.commerce.productName(),
      providerId,
      unitId,
      presentation: faker.commerce.productAdjective(),
      quantityPerUnit: faker.number.int().toString(),
      isKosher: faker.datatype.boolean(),
      kosherDetails: { id: kosherDetailsId },
      productionData: { id: productionDataId },
      purchaseData: { id: purchaseDataId },
      departmentId,
    };

    const product = this.productsRepository.create(data);
    await this.productsRepository.save(product);
    return product;
  }
}
