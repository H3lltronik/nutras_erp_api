import { Controller, Get } from '@nestjs/common';
import { ProductsTypeService } from '../services/product-type.service';

@Controller('product-types')
export class ProductTypesController {
  constructor(private readonly productService: ProductsTypeService) {}

  // @Post()
  // create(@Body() createProductDto: CreateProductDto) {
  //   return this.productService.create(createProductDto);
  // }

  @Get()
  async findAll() {
    return await this.productService.findAll();
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
