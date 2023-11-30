import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Warehouse } from '../../warehouse/entities/warehouse.entity';
import { faker } from '@faker-js/faker';

type WarehouseSeederConfig = {
  generalWarehouseId: string;
  productionWarehouseId: string;
  entryWarehouseId: string;
  exitWarehouseId: string;
};

@Injectable()
export class WarehouseSeederService {
  constructor(
    @InjectRepository(Warehouse)
    private warehousesRepository: Repository<Warehouse>,
  ) {}

  async seed(config: WarehouseSeederConfig) {
    console.log('Seeding warehouses...');
    const {
      generalWarehouseId,
      productionWarehouseId,
      entryWarehouseId,
      exitWarehouseId,
    } = config;

    return await this.warehousesRepository.save([
      {
        name: 'General',
        id: generalWarehouseId,
        address: faker.string.alpha({ length: 10 }),
      },
      {
        name: 'Produccion',
        id: productionWarehouseId,
        address: faker.string.alpha({ length: 10 }),
      },
      {
        name: 'Entrada',
        id: entryWarehouseId,
        address: faker.string.alpha({ length: 10 }),
      },
      {
        name: 'Salida',
        id: exitWarehouseId,
        address: faker.string.alpha({ length: 10 }),
      },
    ]);
  }
}
