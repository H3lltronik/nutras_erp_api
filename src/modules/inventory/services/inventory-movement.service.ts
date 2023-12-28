import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInventoryMovementDto } from '../dto/inventory_movement/create-inventory-movement.dto';
import { UpdateInventoryMovementDto } from '../dto/inventory_movement/update-inventory-movement.dto';
import { InventoryMovement } from '../entities/inventory_movement.entity';
import { MovementTypeService } from './movement_type.service';
import { LoteService } from '../../lote/services/lote.service';
import { InventoryMovementLoteService } from './inventory-movement-lote.service';

// LOTE ENTRY TYPES
const naturalLoteEntryTypeId = '6cebdab4-cc4b-4bee-b011-286c0ce6979a';
const divisionLoteEntryTypeId = '65a427ba-d703-4f8f-b688-ccfa44d62dba';

@Injectable()
export class InventoryMovementService {
  constructor(
    @InjectRepository(InventoryMovement)
    private inventoryMovementRepository: Repository<InventoryMovement>,
    private movementTypeService: MovementTypeService,
    private loteService: LoteService,
    private inventoryMovementLoteService: InventoryMovementLoteService,
  ) {}

  async create(createInventoryMovementDto: CreateInventoryMovementDto) {
    let newInventoryMovement: any = {
      ...createInventoryMovementDto
    }
    const movementType = await this.movementTypeService.findOne(newInventoryMovement.movementTypeId);
    const inventoryMovementInstance = await this.inventoryMovementRepository.save(
      createInventoryMovementDto,
    );
    newInventoryMovement.id = inventoryMovementInstance.id;
    switch(movementType.action) {
      case 'input': await this.createInputInventoryMovement(newInventoryMovement);
      case 'output': await this.createOutputInventoryMovement(newInventoryMovement);
    }
    return inventoryMovementInstance;
  }

  async createInputInventoryMovement(inventoryMovement: any) {
    if(!!inventoryMovement.batches && !!inventoryMovement.batches.length) {
      for (const batch of inventoryMovement.batches) {
        const newBatch = await this.loteService.create({
          ...batch,
          expirationDate: new Date(batch.expirationDate),
          loteEntryTypeId: naturalLoteEntryTypeId,
          wharehouseId: inventoryMovement.toWarehouseId,
        });
        
        const newInventoryMovementLote = await this.inventoryMovementLoteService.create({
          loteId: newBatch.id,
          inventoryMovementId: inventoryMovement.id,
          folio: `${batch.folio}`,
          quantity: batch.quantity,
        });
      }
    }
    return;
  }

  async createOutputInventoryMovement(inventoryMovement: any) {
    return this.inventoryMovementRepository.save(inventoryMovement);
  }

  findAll() {
    return this.inventoryMovementRepository.find({
      withDeleted: false,
      relations: [
        'ot',
        'fromWarehouse',
        'toWarehouse',
        'movementConcept',
        'inventoryMovementLotes',
        'inventoryMovementLotes.lote',
        'inventoryMovementLotes.lote.product',
      ],
    });
  }

  async findOne(id: string) {
    const inventory = await this.inventoryMovementRepository.findOne({
      where: { id },
      withDeleted: false,
    });

    if (!inventory) {
      throw new HttpException('Measure unit not found', 404);
    }

    return inventory;
  }

  async update(
    id: string,
    updateInventoryMovementDto: UpdateInventoryMovementDto,
  ) {
    await this.inventoryMovementRepository.update(
      id,
      updateInventoryMovementDto,
    );

    const inventory = await this.inventoryMovementRepository.findOne({
      where: { id },
    });

    return inventory;
  }

  remove(id: string) {
    return this.inventoryMovementRepository.update(id, {
      deletedAt: new Date(),
    });
  }
}
