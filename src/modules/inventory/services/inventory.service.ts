import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { GetInventoryFilterDto } from '../dto/inventory/get-inventory.dto';
import { InventoryMovement } from '../entities/inventory_movement.entity';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(InventoryMovement)
    private inventoryMovementsRepository: Repository<InventoryMovement>,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async findByProduct(
    productId: string,
    getInventoryFilterDto: GetInventoryFilterDto,
  ) {
    const { toId, fromId } = getInventoryFilterDto;
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

  async findAll() {
    const rawData: RawDataItem[] = await this.productsRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.lote', 'lote')
      .leftJoinAndSelect('lote.inventoryMovementLote', 'inventoryMovementLote')
      .leftJoinAndSelect(
        'inventoryMovementLote.inventoryMovement',
        'inventoryMovement',
      )
      .leftJoinAndSelect('inventoryMovement.toWarehouse', 'toWarehouse')
      .select([
        'product.id AS product_id',
        'product.commonName AS product_name',
        'toWarehouse.id AS warehouse_id',
        'toWarehouse.name AS warehouse_name',
        'lote.quantity AS lote_quantity',
        'inventoryMovementLote.quantity AS inventory_movement_quantity',
      ])
      .getRawMany();
    return rawData;

    const inventory: Record<string, InventoryProduct> = {};

    for (const item of rawData) {
      if (!item.warehouse_name || !item.warehouse_id) {
        console.warn(
          'Warning: Missing warehouse data for product:',
          item.product_id,
        );
        continue; // Skip this iteration if warehouse data is missing
      }

      if (!inventory[item.product_id]) {
        inventory[item.product_id] = {
          product_id: item.product_id,
          product_name: item.product_name,
          total_product_count: 0,
          warehouses: [],
        };
      }

      const product = inventory[item.product_id];
      product.total_product_count += parseInt(item.lote_quantity);

      const warehouseIndex = product.warehouses.findIndex(
        (w) => w.name === item.warehouse_name,
      );
      if (warehouseIndex === -1) {
        product.warehouses.push({
          product_count: parseInt(item.lote_quantity),
          name: item.warehouse_name,
          id: item.warehouse_id,
        });
      } else {
        product.warehouses[warehouseIndex].product_count += parseInt(
          item.lote_quantity,
        );
      }
    }

    const formattedInventory: InventoryProduct[] = Object.values(inventory);

    return formattedInventory;
  }
}
