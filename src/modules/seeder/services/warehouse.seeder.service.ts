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
      {
        name: 'Proveedor',
        id: "4726f79a-b220-4eec-9d68-cdd9f4b8a92d",
        address: faker.string.alpha({ length: 10 }),
        hidden: true,
      },
      {
        name: 'Cliente',
        id: "6c82d8ee-cb13-4d7a-ab60-0de1ce6909f5",
        address: faker.string.alpha({ length: 10 }),
        hidden: true,
      },
      {
        name: 'Donación humana',
        id: "54304806-604e-493d-8d58-a37f360c26f8",
        address: faker.string.alpha({ length: 10 }),
        hidden: true,
      },
      {
        name: 'Basura',
        id: "33ad4c77-610e-4b67-83a6-d588026a09cb",
        address: faker.string.alpha({ length: 10 }),
        hidden: true,
      },
      {
        name: 'Ganado',
        id: "c52c7f3b-0668-4ae1-8c19-533f80c3594d",
        address: faker.string.alpha({ length: 10 }),
        hidden: true,
      },
    ]);
  }
}
