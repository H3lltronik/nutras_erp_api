import { DatabaseExceptionFilter } from '@/src/common/filters/DatabaseExceptionFilter';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UseFilters,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateProductDto } from '../dto/product/create-product.dto';
import { GetProductsFilterDto } from '../dto/product/get-product.dto';
import { UpdateProductDto } from '../dto/product/update-product.dto';
import { ProductService } from '../services/product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('export')
  async downloadExcel(
    @Res() res: Response,
    @Query() filterDto: GetProductsFilterDto,
  ) {
    try {
      const buffer = await this.productService.exportToExcel(filterDto);
      const filename = 'export.xlsx';
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      );
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="${filename}"`,
      );
      res.end(buffer);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error generating Excel file');
    }
  }

  @Post()
  @UseFilters(new DatabaseExceptionFilter())
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  async findAll(@Query() filterDto: GetProductsFilterDto) {
    const result = await this.productService.findAll(filterDto);
    return {
      data: result.items,
      pagination: result.paginationMetadata,
    };
  }

  @Get('with-batches')
  async findAllWithBatches(@Query() filterDto: GetProductsFilterDto) {
    const result = await this.productService.findAllWithBatches(filterDto);
    return {
      data: result.items,
      pagination: result.paginationMetadata,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  @UseFilters(new DatabaseExceptionFilter())
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
