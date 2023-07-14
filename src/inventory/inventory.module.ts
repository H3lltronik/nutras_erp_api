import { Module } from '@nestjs/common';
import { InventoryService } from './services/inventory.service';
import { InventoryController } from './controllers/inventory.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryMovement } from './entities/inventory_movement.entity';
import { Inventory } from './entities/inventory.entity';
import { InventoryMovementLoteController } from './controllers/inventory-movement-lote.controller';
import { InventoryMovementController } from './controllers/inventory-movement.controller';
import { InventoryMovementLoteService } from './services/inventory-movement-lote.service';
import { InventoryMovementService } from './services/inventory-movement.service';
import { InventoryMovementLote } from './entities/inventory_movement_lote.entity';

const repositories = TypeOrmModule.forFeature([
  InventoryMovement,
  Inventory,
  InventoryMovementLote,
]);

@Module({
  controllers: [
    InventoryController,
    InventoryMovementController,
    InventoryMovementLoteController,
  ],
  providers: [
    InventoryService,
    InventoryMovementService,
    InventoryMovementLoteService,
  ],
  imports: [repositories],
})
export class InventoryModule {}
