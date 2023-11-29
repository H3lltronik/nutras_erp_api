import { IsEntityExistConstraint } from '@/src/common/decorators/dto/is_entity_exists/is_entity_exists.constraint';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryMovementLoteController } from './controllers/inventory-movement-lote.controller';
import { InventoryMovementController } from './controllers/inventory-movement.controller';
import { InventoryController } from './controllers/inventory.controller';
import { InventoryMovement } from './entities/inventory_movement.entity';
import { InventoryMovementLote } from './entities/inventory_movement_lote.entity';
import { InventoryMovementLoteService } from './services/inventory-movement-lote.service';
import { InventoryMovementService } from './services/inventory-movement.service';
import { InventoryService } from './services/inventory.service';

const repositories = TypeOrmModule.forFeature([
  InventoryMovement,
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
    IsEntityExistConstraint,
  ],
  imports: [repositories],
})
export class InventoryModule {}
