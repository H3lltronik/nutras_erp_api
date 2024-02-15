import { Controller, Get, Query } from '@nestjs/common';
import { GetProductTypesFilterDto } from '../dto/productType/get-product-types.dto';
import { PPProductsTypeService } from '../services/pp-product-type.service';

@Controller('pp-product-types')
export class PPProductTypeController {
  constructor(private readonly ppProductTypesService: PPProductsTypeService) {}

  @Get()
  async findAll(@Query() filterDto: GetProductTypesFilterDto) {
    const result = await this.ppProductTypesService.findAll(filterDto);
    return {
      data: result.items,
      pagination: result.paginationMetadata,
    };
  }
}
