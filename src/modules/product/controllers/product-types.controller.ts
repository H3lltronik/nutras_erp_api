import { Controller, Get, Query } from '@nestjs/common';
import { GetProductTypesFilterDto } from '../dto/productType/get-product-types.dto';
import { ProductsTypeService } from '../services/product-type.service';

@Controller('product-types')
export class ProductTypesController {
  constructor(private readonly productTypesService: ProductsTypeService) {}

  @Get()
  async findAll(@Query() filterDto: GetProductTypesFilterDto) {
    const result = await this.productTypesService.findAll(filterDto);
    return {
      data: result.items,
      pagination: result.paginationMetadata,
    };
  }
}
