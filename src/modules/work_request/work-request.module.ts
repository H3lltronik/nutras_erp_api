import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeasureUnitModule } from '../measure_unit/measure_unit.module';
import { WorkRequestController } from './controllers/work-request.controller';
import { WorkRequestProduct } from './entities/work-request-products.entity';
import { WorkRequest } from './entities/work-request.entity';
import { WorkRequestService } from './services/work-request.service';

const repositories = TypeOrmModule.forFeature([
  WorkRequest,
  WorkRequestProduct,
]);

@Module({
  controllers: [WorkRequestController],
  providers: [WorkRequestService],
  imports: [repositories, MeasureUnitModule],
  exports: [WorkRequestService],
})
export class WorkRequestModule {}
