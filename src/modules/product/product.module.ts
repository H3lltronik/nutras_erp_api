import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeasureUnitModule } from '../measure_unit/measure_unit.module';
import { ProductController } from './controllers/product.controller';
import { Product } from './entities/product.entity';
import { ProductService } from './services/product.service';

const repositories = TypeOrmModule.forFeature([Product]);

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [repositories, MeasureUnitModule],
})
export class ProductModule {}
