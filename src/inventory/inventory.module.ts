import { Module } from '@nestjs/common';
import { InventoryService } from './services/inventory.service';
import { InventoryController } from './controllers/inventory.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryMovement } from './entities/inventory_movement.entity';
import { Inventory } from './entities/inventory.entity';

const repositories = TypeOrmModule.forFeature([
  InventoryMovement,
  Inventory,
  InventoryMovement,
]);

@Module({
  controllers: [InventoryController],
  providers: [InventoryService],
  imports: [repositories],
})
export class InventoryModule {}
