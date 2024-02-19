import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeasureUnitModule } from '../measure_unit/measure_unit.module';
import { ProductTypeCategoryController } from './controllers/product-type-category.controller';
import { ProductPresentationController } from './controllers/product-presentation.controller';
import { ProductTypesController } from './controllers/product-types.controller';
import { ProductController } from './controllers/product.controller';
import { KosherDetails } from './entities/kosher-details.entity';
import { ProductTypeCategory } from './entities/product-type-category.entity';
import { ProductPresentation } from './entities/product-presentation.entity';
import { ProductType } from './entities/product-type.entity';
import { Product } from './entities/product.entity';
import { ProductionData } from './entities/production-product-data.entity';
import { PurchaseData } from './entities/purchase-product-data.entity';
import { ProductTypeCategoryService } from './services/product-type-category.service';
import { ProductPresentationService } from './services/product-presentation.service';
import { ProductsTypeService } from './services/product-type.service';
import { ProductService } from './services/product.service';

const repositories = TypeOrmModule.forFeature([
  Product,
  ProductType,
  ProductTypeCategory,
  ProductPresentation,
  PurchaseData,
  ProductionData,
  KosherDetails,
]);

@Module({
  controllers: [
    ProductController,
    ProductTypesController,
    ProductTypeCategoryController,
    ProductPresentationController,
  ],
  providers: [
    ProductService,
    ProductsTypeService,
    ProductTypeCategoryService,
    ProductPresentationService,
  ],
  imports: [repositories, MeasureUnitModule],
  exports: [ProductService, ProductsTypeService, ProductPresentationService],
})
export class ProductModule {}
