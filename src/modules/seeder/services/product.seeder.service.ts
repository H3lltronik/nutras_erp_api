import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { ProductService } from '../../product/services/product.service';

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
    private productService: ProductService,
  ) {}

  async seed(config: ProductSeederConfig) {
    const productsInDb = await this.productsRepository.find();
    if(productsInDb.length > 0) {
      console.log('Products were already seeded...');
      return null;
    }
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

  public async fix() {
    const productsToFix = await this.productsRepository.find({
      where: [
        { completeCode: null },
        { completeCode: Like('%-%') }
      ]
    });

    for (const product of productsToFix) {
      const completeCode = await this.productService.verifyProductCode(product);
      await this.productsRepository.update(product.id, { completeCode });
    }
  }
}
