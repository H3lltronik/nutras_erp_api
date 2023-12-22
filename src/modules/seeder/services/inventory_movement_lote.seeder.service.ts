import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryMovementLote } from '../../inventory/entities/inventory_movement_lote.entity';

type InventoryMovementLoteSeederConfig = {
  loteIds: string[];
  inventoryMovementIds: string[];
};

@Injectable()
export class InventoryMovementLoteSeederService {
  constructor(
    @InjectRepository(InventoryMovementLote)
    private inventoryMovementLotesRepository: Repository<InventoryMovementLote>,
  ) {}

  async seed(
    config: InventoryMovementLoteSeederConfig,
  ): Promise<InventoryMovementLote[]> {
    console.log('Seeding inventory movement lotes...');
    const { loteIds, inventoryMovementIds } = config;

    const promises: Promise<InventoryMovementLote>[] = [];
    for (let i = 0; i < 30; i++) {
      const loteId = faker.helpers.arrayElement(loteIds);
      const inventoryMovementId =
        faker.helpers.arrayElement(inventoryMovementIds);
      promises.push(
        this.inventoryMovementLotesRepository.save({
          loteId,
          folio: faker.string.alpha({ length: 10 }),
          quantity: faker.number.int({ max: 10, min: 1 }),
          inventoryMovementId,
        }),
      );
    }

    const inventoryMovementLotes: InventoryMovementLote[] = await Promise.all(
      promises,
    );
    return inventoryMovementLotes;
  }
}
