import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeasureUnitModule } from '../measure_unit/measure_unit.module';
import { ProductTypesController } from './controllers/product-types.controller';
import { ProductController } from './controllers/product.controller';
import { KosherDetails } from './entities/kosher-details.entity';
import { ProductType } from './entities/product-type.entity';
import { Product } from './entities/product.entity';
import { ProductionData } from './entities/production-product-data.entity';
import { PurchaseData } from './entities/purchase-product-data.entity';
import { ProductsTypeService } from './services/product-type.service';
import { ProductService } from './services/product.service';
import { ProductPresentation } from './entities/product-presentation.entity';
import { ProductPresentationService } from './services/product-presentation.service';
import { ProductPresentationController } from './controllers/product-presentation.controller';

const repositories = TypeOrmModule.forFeature([
  Product,
  ProductType,
  ProductPresentation,
  PurchaseData,
  ProductionData,
  KosherDetails,
]);

@Module({
  controllers: [ProductController, ProductTypesController, ProductPresentationController],
  providers: [ProductService, ProductsTypeService, ProductPresentationService],
  imports: [repositories, MeasureUnitModule],
  exports: [ProductService, ProductsTypeService, ProductPresentationService],
})
export class ProductModule {}
