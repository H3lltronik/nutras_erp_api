import { Controller, Get, Query } from '@nestjs/common';
import { GetProductPresentationsFilterDto } from '../dto/productPresentation/get-product-presentation.dto';
import { ProductPresentationService } from '../services/product-presentation.service';

@Controller('product-presentation')
export class ProductPresentationController {
  constructor(private readonly productPresentationService: ProductPresentationService) {}

  @Get()
  async findAll(@Query() filterDto: GetProductPresentationsFilterDto) {
    const result = await this.productPresentationService.findAll(filterDto);
    return {
      data: result.items,
      pagination: result.paginationMetadata,
    };
  }
}
