import { Paginator } from '@/src/common/utils/paginator';
import { faker } from '@faker-js/faker';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoteService } from '../../lote/services/lote.service';
import { CreateInventoryMovementDto } from '../dto/inventory_movement/create-inventory-movement.dto';
import { GetInventoryMovementFilterDto } from '../dto/inventory_movement/get-inventory-movement.dto';
import { UpdateInventoryMovementDto } from '../dto/inventory_movement/update-inventory-movement.dto';
import { InventoryMovement } from '../entities/inventory_movement.entity';
import { InventoryMovementFiltersHandler } from '../filters/inventory-movement-filters.handler';
import { InventoryMovementLoteService } from './inventory-movement-lote.service';
import { MovementTypeService } from './movement_type.service';
import { InventoryMovementData } from './types';

// LOTE ENTRY TYPES
const naturalLoteEntryTypeId = '6cebdab4-cc4b-4bee-b011-286c0ce6979a';
const divisionLoteEntryTypeId = '65a427ba-d703-4f8f-b688-ccfa44d62dba';

@Injectable()
export class InventoryMovementService {
  constructor(
    @InjectRepository(InventoryMovement)
    private inventoryMovementRepository: Repository<InventoryMovement>,
    // private inventoryMovementLoteRepository: Repository<InventoryMovementLote>,
    private movementTypeService: MovementTypeService,
    private loteService: LoteService,
    private inventoryMovementLoteService: InventoryMovementLoteService,
  ) {}

  async create(createInventoryMovementDto: CreateInventoryMovementDto) {
    let newInventoryMovement: any = {
      ...createInventoryMovementDto,
    };
    const movementType = await this.movementTypeService.findOne(
      newInventoryMovement.movementTypeId,
    );
    const inventoryMovementInstance =
      await this.inventoryMovementRepository.save(createInventoryMovementDto);
    newInventoryMovement.id = inventoryMovementInstance.id;
    switch (movementType.action) {
      case 'input':
        await this.createInputInventoryMovement(newInventoryMovement);
      case 'output':
        await this.createOutputInventoryMovement(newInventoryMovement);
    }
    return inventoryMovementInstance;
  }

  async createInputInventoryMovement(inventoryMovement: any) {
    if (!!inventoryMovement.batches && !!inventoryMovement.batches.length) {
      for (const batch of inventoryMovement.batches) {
        const newBatch = await this.loteService.create({
          ...batch,
          expirationDate: new Date(batch.expirationDate),
          loteEntryTypeId: naturalLoteEntryTypeId,
          wharehouseId: inventoryMovement.destinyWarehouseId,
          description: 'Lote de entrada',
        });

        const newInventoryMovementLote =
          await this.inventoryMovementLoteService.create({
            loteId: newBatch.id,
            inventoryMovementId: inventoryMovement.id,
            folio: `${batch.folio}`,
            quantity: batch.quantity,
          });
      }
    }
    return;
  }

  async createOutputInventoryMovement(
    inventoryMovement: InventoryMovementData,
  ) {
    const result = [];
    for (const inventoryMovementLote of inventoryMovement.lotes) {
      const inventoryMovementInstance =
        await this.inventoryMovementLoteService.findOne(
          inventoryMovementLote.id,
        );

      const entity = await this.inventoryMovementLoteService.create({
        inventoryMovementId: inventoryMovement.id,
        folio: faker.string.alphanumeric(10),
        quantity: inventoryMovementLote.quantity,
        loteId: inventoryMovementInstance.loteId,
      });

      result.push(entity);
    }

    return result;

    // const test = await this.loteService.findOne({
    //   id: inventoryMovement.lotes[0].id,
    //   relations: {
    //     loteEntryType: true,
    //   },
    // });
    // console.log(test);
  }

  async findAll(filterDto: GetInventoryMovementFilterDto) {
    const { limit, offset, withDeleted } = filterDto;

    const query =
      this.inventoryMovementRepository.createQueryBuilder('inventoryMovement');
    const filterHandler = new InventoryMovementFiltersHandler();

    query.leftJoinAndSelect('inventoryMovement.ot', 'ot');
    query.leftJoinAndSelect('inventoryMovement.fromWarehouse', 'fromWarehouse');
    query.leftJoinAndSelect('inventoryMovement.toWarehouse', 'toWarehouse');
    query.leftJoinAndSelect(
      'inventoryMovement.movementConcept',
      'movementConcept',
    );
    query.leftJoinAndSelect('movementConcept.movementType', 'movementType');
    query.leftJoinAndSelect(
      'inventoryMovement.inventoryMovementLotes',
      'inventoryMovementLotes',
    );
    query.leftJoinAndSelect('inventoryMovementLotes.lote', 'lote');
    query.leftJoinAndSelect('lote.product', 'product');
    query.orderBy('inventoryMovement.partidaId', 'DESC');
    if (withDeleted === 'true') query.withDeleted();

    filterHandler.applyFilters(query, filterDto);
    const paginator = new Paginator<InventoryMovement>();
    return await paginator.paginate(query, limit, offset);
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
