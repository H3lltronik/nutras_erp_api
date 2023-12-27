import { Injectable } from '@nestjs/common';
import { MovementConceptService } from '../../inventory/services/movement_concept.service';
import { MovementConcept } from '../../inventory/entities/movement_concept.entity';

@Injectable()
export class MovementConceptSeederService {

    movementConcepts: Partial<MovementConcept>[] = [
        
        {
            name: "Adquisición de mercancía",
            movementTypeId: "d2f718c8-5626-4627-9f21-2001b2129f3d",
            originWarehouseId: "4726f79a-b220-4eec-9d68-cdd9f4b8a92d",
            destinyWarehouseId: "621b95b5-6320-4e62-8b9d-4bc068867ee6",
        },
        {
            name: "Salida a producción",
            movementTypeId: "62dcc55d-1c72-4469-b5be-0f37cd184851",
            originWarehouseId: "5606d5cd-e764-4478-bd2e-639cfb0a90b9",
            destinyWarehouseId: "5606d5cd-e764-4478-bd2e-639cfb0a90b9",
        },
        {
            name: "Venta",
            movementTypeId: "0eb04bf4-5bed-49e0-8710-1f548235965b",
            originWarehouseId: "621b95b5-6320-4e62-8b9d-4bc068867ee6",
            destinyWarehouseId: "6c82d8ee-cb13-4d7a-ab60-0de1ce6909f5",
        },
        {
            name: "Devolución de mercancía",
            movementTypeId: "d2f718c8-5626-4627-9f21-2001b2129f3d",
            originWarehouseId: "6c82d8ee-cb13-4d7a-ab60-0de1ce6909f5",
            destinyWarehouseId: "621b95b5-6320-4e62-8b9d-4bc068867ee6",
        },
        {
            name: "Recepción de producción",
            movementTypeId: "ff95b7b2-d2ff-455c-a4d7-648280ed5ee2",
            originWarehouseId: "5606d5cd-e764-4478-bd2e-639cfb0a90b9",
            destinyWarehouseId: "621b95b5-6320-4e62-8b9d-4bc068867ee6",
        },
        {
            name: "Entrega de muestra a externo",
            movementTypeId: "0eb04bf4-5bed-49e0-8710-1f548235965b",
            originWarehouseId: null,
            destinyWarehouseId: "6c82d8ee-cb13-4d7a-ab60-0de1ce6909f5",
        },
        {
            name: "Donación humana",
            movementTypeId: "0eb04bf4-5bed-49e0-8710-1f548235965b",
            originWarehouseId: null,
            destinyWarehouseId: "54304806-604e-493d-8d58-a37f360c26f8",
        },
        {
            name: "Desecho",
            movementTypeId: "0eb04bf4-5bed-49e0-8710-1f548235965b",
            originWarehouseId: null,
            destinyWarehouseId: "33ad4c77-610e-4b67-83a6-d588026a09cb",
        },
        {
            name: "Forrajero / Ganadero",
            movementTypeId: "0eb04bf4-5bed-49e0-8710-1f548235965b",
            originWarehouseId: null,
            destinyWarehouseId: "c52c7f3b-0668-4ae1-8c19-533f80c3594d",
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
