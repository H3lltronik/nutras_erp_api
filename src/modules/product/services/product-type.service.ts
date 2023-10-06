import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductType } from '../entities/product-type.entity';

@Injectable()
export class ProductsTypeService {
  constructor(
    @InjectRepository(ProductType)
    private productTypeRepository: Repository<ProductType>,
  ) {}

  async findAll() {
    return await this.productTypeRepository.find();
  }
}
