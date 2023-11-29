import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetInventoryFilterDto } from '../dto/inventory/get-inventory.dto';
import { InventoryMovement } from '../entities/inventory_movement.entity';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(InventoryMovement)
    private inventoryMovementsRepository: Repository<InventoryMovement>,
  ) {}

  async findAll(getInventoryFilterDto: GetInventoryFilterDto) {
    const { productId, toId, fromId } = getInventoryFilterDto;
    if (!productId) throw new Error('Product id is required');

    const inventoryMovements = await this.inventoryMovementsRepository.find({
      relations: [
        'toWarehouse',
        'fromWarehouse',
        'inventoryMovementLotes',
        'inventoryMovementLotes.lote',
        'inventoryMovementLotes.lote.product',
      ],
    });

    const inventoryMap: { [key: string]: { [key: string]: number } } = {};

    for (const inventoryMovement of inventoryMovements) {
      for (const inventoryMovementLote of inventoryMovement.inventoryMovementLotes) {
        if (inventoryMovementLote.lote.product.id === productId) {
          const warehouseToId = inventoryMovement.toWarehouse?.id;
          const warehouseFromId = inventoryMovement.fromWarehouse?.id;
          const productQuantity = inventoryMovementLote.quantity;

          // Handle Entry to Warehouse
          if (warehouseToId) {
            if (!inventoryMap[warehouseToId]) {
              inventoryMap[warehouseToId] = {};
            }
            if (!inventoryMap[warehouseToId][productId]) {
              inventoryMap[warehouseToId][productId] = 0;
            }
            inventoryMap[warehouseToId][productId] += productQuantity;
          }

          // Handle Exit from Warehouse
          if (warehouseFromId) {
            if (!inventoryMap[warehouseFromId]) {
              inventoryMap[warehouseFromId] = {};
            }
            if (!inventoryMap[warehouseFromId][productId]) {
              inventoryMap[warehouseFromId][productId] = 0;
            }
            inventoryMap[warehouseFromId][productId] -= productQuantity;
          }
        }
      }
    }

    // Convert inventoryMap to desired output format
    const inventoryArray: any[] = [];
    for (const warehouseId in inventoryMap) {
      for (const prodId in inventoryMap[warehouseId]) {
        if (inventoryMap[warehouseId][prodId] < 0) {
          continue;
        }

        inventoryArray.push({
          warehouseId: warehouseId,
          warehouseName: inventoryMovements.find(
            (inventoryMovement) =>
              inventoryMovement.toWarehouse?.id === warehouseId,
          )?.toWarehouse?.name,
          productId: prodId,
          productName: inventoryMovements.find((inventoryMovement) =>
            inventoryMovement.inventoryMovementLotes.find(
              (inventoryMovementLote) =>
                inventoryMovementLote.lote.product.id === prodId,
            ),
          )?.inventoryMovementLotes?.[0]?.lote?.product?.commonName,
          quantity: inventoryMap[warehouseId][prodId],
        });
      }
    }

    return inventoryArray;
  }

  async find(id: string) {
    return null;
  }
}
