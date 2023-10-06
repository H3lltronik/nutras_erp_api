import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeasureUnitModule } from '../measure_unit/measure_unit.module';
import { ProductTypesController } from './controllers/product-types.controller';
import { ProductController } from './controllers/product.controller';
import { ProductType } from './entities/product-type.entity';
import { Product } from './entities/product.entity';
import { ProductsTypeService } from './services/product-type.service';
import { ProductService } from './services/product.service';

const repositories = TypeOrmModule.forFeature([Product, ProductType]);

@Module({
  controllers: [ProductController, ProductTypesController],
  providers: [ProductService, ProductsTypeService],
  imports: [repositories, MeasureUnitModule],
})
export class ProductModule {}
