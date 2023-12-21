import { Injectable } from '@nestjs/common';
import { MovementTypeService } from '../../inventory/services/movement_type.service';
import { MovementType } from '../../inventory/entities/movement_type.entity';

@Injectable()
export class MovementTypeSeederService {

    movementTypes: Partial<MovementType>[] = [
        {
            id: '44d846e6-5599-450f-87d8-9fa6a97b4bef',
            name: 'Adquisicion'
        },
        {
            id: 'e5f756f6-7eff-4531-b052-b58db263a82c',
            name: 'Salida produccion'
        },
        {
            id: 'cf285f78-bb24-4185-bea8-ceb7a5efc64e',
            name: 'Venta'
        },
        {
            id: 'ff95b7b2-d2ff-455c-a4d7-648280ed5ee2',
            name: 'Vale de entrada'
        },
        {
            id: '62dcc55d-1c72-4469-b5be-0f37cd184851',
            name: 'Vale de salida'
        },
        {
            id: 'd2f718c8-5626-4627-9f21-2001b2129f3d',
            name: 'Autorización de Entrada'
        },
        {
            id: '0eb04bf4-5bed-49e0-8710-1f548235965b',
            name: 'Autorización de Salida'
        },
    ];

  constructor(private MovTypeService: MovementTypeService) {}

  async seed() {
    console.log('Seeding movement types...');
    let movements = [];

    for (const movementType of this.movementTypes) {
      await this.MovTypeService.findOrCreateByName(movementType);
      movements.push(movementType);
    }

    return movements;
  }
}
