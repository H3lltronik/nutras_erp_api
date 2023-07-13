import { Module } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { WarehouseController } from './warehouse.controller';
import { Warehouse } from './entities/warehouse.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

const repositories = TypeOrmModule.forFeature([Warehouse]);

@Module({
  controllers: [WarehouseController],
  providers: [WarehouseService],
  imports: [repositories],
})
export class WarehouseModule {}
