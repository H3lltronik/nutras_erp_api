import { Module } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeasureUnitModule } from '../measure_unit/measure_unit.module';

const repositories = TypeOrmModule.forFeature([Product]);

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [repositories, MeasureUnitModule],
})
export class ProductModule {}
