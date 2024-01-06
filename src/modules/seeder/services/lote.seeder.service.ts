import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lote } from '../../lote/entities/lote.entity';

type LoteSeederConfig = {
  naturalLoteEntryTypeId: string;
  divisionLoteEntryTypeId: string;
  productIds: string[];
  warehouseId: string;
};

@Injectable()
export class LoteSeederService {
  constructor(
    @InjectRepository(Lote)
    private lotesRepository: Repository<Lote>,
  ) {}

  async seed(config: LoteSeederConfig): Promise<Lote> {
    const lotesInDb = await this.lotesRepository.find();
    if (lotesInDb.length > 0) {
      console.log('Lotes were already seeded...');
      return;
    }
    console.log('Seeding lotes...');
    const { naturalLoteEntryTypeId, divisionLoteEntryTypeId, productIds } =
      config;
    const productId = faker.helpers.arrayElement(productIds);

    return await this.lotesRepository.save({
      code: faker.string.alpha(),
      description: faker.commerce.productDescription(),
      quantity: faker.number.int({ max: 20 }),
      expirationDate: faker.date.future(),
      productId,
      loteEntryTypeId: naturalLoteEntryTypeId,
      wharehouseId: config.warehouseId,
    });
  }
}
