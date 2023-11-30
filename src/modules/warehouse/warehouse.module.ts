import { Module } from '@nestjs/common';
import { WarehouseService } from './services/warehouse.service';
import { WarehouseController } from './controllers/warehouse.controller';
import { Warehouse } from './entities/warehouse.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

const repositories = TypeOrmModule.forFeature([Warehouse]);

@Module({
  controllers: [WarehouseController],
  providers: [WarehouseService],
  imports: [repositories],
  exports: [WarehouseService],
})
export class WarehouseModule {}
