import { Injectable } from '@nestjs/common';
import { MovementTypeService } from '../../inventory/services/movement_type.service';
import { MovementType } from '../../inventory/entities/movement_type.entity';

@Injectable()
export class MovementTypeSeederService {

    movementTypes: Partial<MovementType>[] = [
        {
            id: 'ff95b7b2-d2ff-455c-a4d7-648280ed5ee2',
            name: 'Vale de entrada',
            action: 'input'
        },
        {
            id: '62dcc55d-1c72-4469-b5be-0f37cd184851',
            name: 'Vale de salida',
            action: 'output'
        },
        {
            id: 'd2f718c8-5626-4627-9f21-2001b2129f3d',
            name: 'Autorización de entrada',
            action: 'input'
        },
        {
            id: '0eb04bf4-5bed-49e0-8710-1f548235965b',
            name: 'Autorización de salida',
            action: 'output'
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
