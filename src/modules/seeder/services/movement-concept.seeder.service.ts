import { Injectable } from '@nestjs/common';
import { MovementConceptService } from '../../inventory/services/movement_concept.service';
import { MovementConcept } from '../../inventory/entities/movement_concept.entity';

@Injectable()
export class MovementConceptSeederService {

    movementConcepts: Partial<MovementConcept>[] = [
        {
            name: 'Adquisición de Mercancía',
            movementTypeId: '44d846e6-5599-450f-87d8-9fa6a97b4bef'
        },
        {
            name: 'Salida a producción',
            movementTypeId: 'e5f756f6-7eff-4531-b052-b58db263a82c'
        },
        {
            name: 'Venta',
            movementTypeId: 'cf285f78-bb24-4185-bea8-ceb7a5efc64e'
        },
        {
            name: 'Salida a producción',
            movementTypeId: '62dcc55d-1c72-4469-b5be-0f37cd184851'
        },
        {
            name: 'Venta',
            movementTypeId: '0eb04bf4-5bed-49e0-8710-1f548235965b'
        },
        {
            name: 'Devolución de mercancía',
            movementTypeId: 'd2f718c8-5626-4627-9f21-2001b2129f3d'
        },
        {
            name: 'Recepción de producción',
            movementTypeId: 'ff95b7b2-d2ff-455c-a4d7-648280ed5ee2'
        },
        {
            name: 'Entrega de Muestra a externo',
            movementTypeId: '0eb04bf4-5bed-49e0-8710-1f548235965b'
        },
        {
            name: 'Donación humana',
            movementTypeId: '0eb04bf4-5bed-49e0-8710-1f548235965b'
        },
        {
            name: 'Desecho',
            movementTypeId: '0eb04bf4-5bed-49e0-8710-1f548235965b'
        },
        {
            name: 'Forrajero / Ganadero',
            movementTypeId: '0eb04bf4-5bed-49e0-8710-1f548235965b'
        },
    ];

  constructor(private MovConceptService: MovementConceptService) {}

  async seed() {
    console.log('Seeding movement concepts...');
    let movements = [];

    for (const movementConcept of this.movementConcepts) {
      await this.MovConceptService.findOrCreateByName(movementConcept);
      movements.push(movementConcept);
    }

    return movements;
  }
}
