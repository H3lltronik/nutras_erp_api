import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeasureUnitModule } from '../measure_unit/measure_unit.module';
import { WorkOrderServiceTypesController } from './controllers/work-order-service-types.controller';
import { WorkOrderController } from './controllers/work-order.controller';
import { WorkOrderServiceType } from './entities/work-order-service-type.entity';
import { WorkOrder } from './entities/work-order.entity';
import { WorkOrderServiceTypesService } from './services/work-order-service-type.service';
import { WorkOrderService } from './services/work-order.service';

const repositories = TypeOrmModule.forFeature([
  WorkOrder,
  WorkOrderServiceType,
]);

@Module({
  controllers: [WorkOrderController, WorkOrderServiceTypesController],
  providers: [WorkOrderService, WorkOrderServiceTypesService],
  imports: [repositories, MeasureUnitModule],
  exports: [WorkOrderService],
})
export class WorkOrderModule {}
