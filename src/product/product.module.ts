import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

const repositories = TypeOrmModule.forFeature([Product]);

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [repositories],
})
export class ProductModule {}
