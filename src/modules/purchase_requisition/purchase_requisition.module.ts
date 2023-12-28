import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeasureUnitModule } from '../measure_unit/measure_unit.module';
import { PurchaseRequisitionController } from './controllers/purchase_requisition.controller';
import { PurchaseRequisition } from './entities/purchase_requisition.entity';
import { PurchaseRequisitionProduct } from './entities/purchase_requisition_product.entity';
import { PurchaseRequisitionService } from './services/purchase_requisition.service';

const repositories = TypeOrmModule.forFeature([
  PurchaseRequisition,
  PurchaseRequisitionProduct,
]);

@Module({
  controllers: [PurchaseRequisitionController],
  providers: [PurchaseRequisitionService],
  imports: [repositories, MeasureUnitModule],
  exports: [PurchaseRequisitionService],
})
export class PurchaseRequisitionModule {}
