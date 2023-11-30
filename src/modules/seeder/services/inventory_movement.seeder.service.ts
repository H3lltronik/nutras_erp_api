import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryMovement } from '../../inventory/entities/inventory_movement.entity';

type InventoryMovementSeederConfig = {
  entryWarehouseId: string;
  exitWarehouseId: string;
  productionWarehouseId: string;
  generalWarehouseId: string;
};
const typeStrings = ['Entrada', 'Salida', 'Reubicación'];

@Injectable()
export class InventoryMovementSeederService {
  constructor(
    @InjectRepository(InventoryMovement)
    private InventoryMovementsRepository: Repository<InventoryMovement>,
  ) {}

  async seed(config: InventoryMovementSeederConfig) {
    console.log('Seeding inventory movements...');
    const {
      entryWarehouseId,
      exitWarehouseId,
      productionWarehouseId,
      generalWarehouseId,
    } = config;
    const typeString = faker.helpers.arrayElement(typeStrings);
    const warehouseIds = [
      entryWarehouseId,
      exitWarehouseId,
      productionWarehouseId,
      generalWarehouseId,
    ];

    const fromId = faker.helpers.arrayElement(warehouseIds);

    const availableToIds = warehouseIds.filter((id) => id !== fromId);
    const toId = faker.helpers.arrayElement(availableToIds);

    const inventoryMovements: InventoryMovement[] = [];

    for (let i = 0; i < 10; i++) {
      const inventoryMovement = await this.InventoryMovementsRepository.save({
        type: typeString,
        quantity: faker.number.int({ max: 100 }),
        ot_id: faker.string.alpha({ length: 10 }),
        reason: faker.lorem.sentence(),
        fromId,
        toId,
      });
      inventoryMovements.push(inventoryMovement);
    }

    return inventoryMovements;
  }
}
