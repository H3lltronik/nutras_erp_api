import { Module } from '@nestjs/common';
import { PurchaseOrderService } from './services/purchase-order.service';
import { PurchaseOrderController } from './controllers/purchase-order.controller';
import { PurchaseOrder } from './entities/purchase-order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

const repositories = TypeOrmModule.forFeature([PurchaseOrder]);

@Module({
  controllers: [PurchaseOrderController],
  providers: [PurchaseOrderService],
  imports: [repositories],
  exports: [PurchaseOrderService],
})
export class PurchaseOrderModule {}
