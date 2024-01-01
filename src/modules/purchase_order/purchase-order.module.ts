import { Module } from '@nestjs/common';
import { PurchaseOrderService } from './services/purchase-order.service';
import { PurchaseOrderController } from './controllers/purchase-order.controller';
import { PurchaseOrder } from './entities/purchase-order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseOrderEntryType } from './entities/purchase-order_entry_type.entity';

const repositories = TypeOrmModule.forFeature([PurchaseOrder, PurchaseOrderEntryType]);

@Module({
  controllers: [PurchaseOrderController],
  providers: [PurchaseOrderService],
  imports: [repositories],
  exports: [PurchaseOrderService],
})
export class PurchaseOrderModule {}
