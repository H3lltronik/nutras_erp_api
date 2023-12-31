import { IsEntityExistConstraint } from '@/src/common/decorators/dto/is_entity_exists/is_entity_exists.constraint';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../product/entities/product.entity';
import { InventoryMovementLoteController } from './controllers/inventory-movement-lote.controller';
import { InventoryMovementController } from './controllers/inventory-movement.controller';
import { InventoryController } from './controllers/inventory.controller';
import { MovementConceptController } from './controllers/movement_concept.controller';
import { MovementTypeController } from './controllers/movement_type.controller';
import { InventoryMovement } from './entities/inventory_movement.entity';
import { InventoryMovementLote } from './entities/inventory_movement_lote.entity';
import { MovementConcept } from './entities/movement_concept.entity';
import { MovementType } from './entities/movement_type.entity';
import { InventoryMovementLoteService } from './services/inventory-movement-lote.service';
import { InventoryMovementService } from './services/inventory-movement.service';
import { InventoryService } from './services/inventory.service';
import { MovementConceptService } from './services/movement_concept.service';
import { MovementTypeService } from './services/movement_type.service';
import { LoteService } from '../lote/services/lote.service';
import { LoteController } from '../lote/controllers/lote.controller';
import { Lote } from '../lote/entities/lote.entity';

const repositories = TypeOrmModule.forFeature([
  InventoryMovement,
  InventoryMovementLote,
  MovementConcept,
  MovementType,
  Product,
  Lote,
]);

@Module({
  controllers: [
    InventoryController,
    InventoryMovementController,
    InventoryMovementLoteController,
    MovementConceptController,
    MovementTypeController,
    LoteController,
  ],
  providers: [
    InventoryService,
    InventoryMovementService,
    InventoryMovementLoteService,
    MovementConceptService,
    MovementTypeService,
    LoteService,
    IsEntityExistConstraint,
  ],
  imports: [repositories],
  exports: [
    InventoryService,
    InventoryMovementService,
    InventoryMovementLoteService,
    MovementConceptService,
    MovementTypeService,
  ],
})
export class InventoryModule {}
