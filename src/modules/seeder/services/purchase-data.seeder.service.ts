import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PurchaseData } from '../../product/entities/purchase-product-data.entity';

@Injectable()
export class PurchaseDataSeederService {
  constructor(
    @InjectRepository(PurchaseData)
    private purchaseDataRepository: Repository<PurchaseData>,
  ) {}

  async seed() {
    console.log('Seeding purchase data...');
    const purchaseData = this.purchaseDataRepository.create({
      allergen: faker.random.word(),
    });
    await this.purchaseDataRepository.save(purchaseData);
    return purchaseData;
  }
}
