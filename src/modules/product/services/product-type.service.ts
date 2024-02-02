import { Paginator } from '@/src/common/utils/paginator';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetProductTypesFilterDto } from '../dto/productType/get-product-types.dto';
import { ProductType } from '../entities/product-type.entity';
import { ProductTypesFiltersHandler } from '../filters/product-type-filter.handler';

@Injectable()
export class ProductsTypeService {
  constructor(
    @InjectRepository(ProductType)
    private productTypeRepository: Repository<ProductType>,
  ) {}

  async findAll(filterDto: GetProductTypesFilterDto) {
    const { limit, offset } = filterDto;

    const query = this.productTypeRepository.createQueryBuilder('productType');
    const filterHandler = new ProductTypesFiltersHandler();

    filterHandler.applyFilters(query, filterDto);

    const paginator = new Paginator<ProductType>();
    return await paginator.paginate(query, limit, offset);
  }

  async findOne(id: string) {
    return await this.productTypeRepository.findOne({
      where: { id },
    });
  }
}
