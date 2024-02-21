import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductionData } from '../../product/entities/production-product-data.entity';

@Injectable()
export class ProductionDataSeederService {
  constructor(
    @InjectRepository(ProductionData)
    private productionDataRepository: Repository<ProductionData>,
  ) {}

  async seed() {
    console.log('Seeding production data...');
    const productionData = this.productionDataRepository.create({
      description: faker.commerce.productDescription(),
      packaging: faker.commerce.productMaterial(),
      mold: faker.commerce.productAdjective(),
    });
    await this.productionDataRepository.save(productionData);
    return productionData;
  }
}
