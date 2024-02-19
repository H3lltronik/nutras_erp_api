import { Controller, Get, Query } from '@nestjs/common';
import { GetProductTypesFilterDto } from '../dto/productType/get-product-types.dto';
import { ProductTypeCategoryService } from '../services/product-type-category.service';

@Controller('pp-product-types')
export class ProductTypeCategoryController {
  constructor(private readonly productTypeCategorysService: ProductTypeCategoryService) {}

  @Get()
  async findAll(@Query() filterDto: GetProductTypesFilterDto) {
    const result = await this.productTypeCategorysService.findAll(filterDto);
    return {
      data: result.items,
      pagination: result.paginationMetadata,
    };
  }
}
