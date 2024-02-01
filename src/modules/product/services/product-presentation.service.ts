import { Paginator } from '@/src/common/utils/paginator';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductPresentation } from '../entities/product-presentation.entity';
import { GetProductPresentationsFilterDto } from '../dto/productPresentation/get-product-presentation.dto';
import { ProductPresentationFiltersHandler } from '../filters/product-presentation-filter.handler';

@Injectable()
export class ProductPresentationService {
  constructor(
    @InjectRepository(ProductPresentation)
    private productPresentationRepository: Repository<ProductPresentation>,
  ) {}

  async findAll(filterDto: GetProductPresentationsFilterDto) {
    const { limit, offset } = filterDto;

    const query = this.productPresentationRepository.createQueryBuilder('productPresentation');
    const filterHandler = new ProductPresentationFiltersHandler();

    filterHandler.applyFilters(query, filterDto);

    const paginator = new Paginator<ProductPresentation>();
    return await paginator.paginate(query, limit, offset);
  }
}
