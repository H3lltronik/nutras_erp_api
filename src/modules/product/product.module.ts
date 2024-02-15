import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeasureUnitModule } from '../measure_unit/measure_unit.module';
import { PPProductTypeController } from './controllers/pp-product-types.controller';
import { ProductPresentationController } from './controllers/product-presentation.controller';
import { ProductTypesController } from './controllers/product-types.controller';
import { ProductController } from './controllers/product.controller';
import { KosherDetails } from './entities/kosher-details.entity';
import { PPProductType } from './entities/pp-product-type.entity';
import { ProductPresentation } from './entities/product-presentation.entity';
import { ProductType } from './entities/product-type.entity';
import { Product } from './entities/product.entity';
import { ProductionData } from './entities/production-product-data.entity';
import { PurchaseData } from './entities/purchase-product-data.entity';
import { PPProductsTypeService } from './services/pp-product-type.service';
import { ProductPresentationService } from './services/product-presentation.service';
import { ProductsTypeService } from './services/product-type.service';
import { ProductService } from './services/product.service';

const repositories = TypeOrmModule.forFeature([
  Product,
  ProductType,
  PPProductType,
  ProductPresentation,
  PurchaseData,
  ProductionData,
  KosherDetails,
]);

@Module({
  controllers: [
    ProductController,
    ProductTypesController,
    PPProductTypeController,
    ProductPresentationController,
  ],
  providers: [
    ProductService,
    ProductsTypeService,
    PPProductsTypeService,
    ProductPresentationService,
  ],
  imports: [repositories, MeasureUnitModule],
  exports: [ProductService, ProductsTypeService, ProductPresentationService],
})
export class ProductModule {}
