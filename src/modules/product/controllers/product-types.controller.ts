import { Controller, Get, Query } from '@nestjs/common';
import { GetProductTypesFilterDto } from '../dto/productType/get-product-types.dto';
import { ProductsTypeService } from '../services/product-type.service';

@Controller('product-types')
export class ProductTypesController {
  constructor(private readonly productTypesService: ProductsTypeService) {}

  // @Post()
  // create(@Body() createProductDto: CreateProductDto) {
  //   return this.productService.create(createProductDto);
  // }

  @Get()
  async findAll(@Query() filterDto: GetProductTypesFilterDto) {
    const result = await this.productTypesService.findAll(filterDto);
    return {
      data: result.items,
      pagination: result.paginationMetadata,
    };
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  //   return this.productService.update(id, updateProductDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.productService.remove(id);
  // }
}
