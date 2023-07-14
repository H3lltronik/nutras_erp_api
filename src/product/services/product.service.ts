import { HttpException, Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/product/create-product.dto';
import { UpdateProductDto } from '../dto/product/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { MeasureUnitService } from '@/src/measure_unit/measure_unit.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private measureUnitService: MeasureUnitService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const measureUnit = await this.measureUnitService.findOne(
      createProductDto.unit,
    );

    return await this.productRepository.save({
      ...createProductDto,
      unit: measureUnit,
    });
  }

  findAll() {
    return this.productRepository.find({ withDeleted: false });
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne({
      where: { id },
      withDeleted: false,
    });

    if (!product) {
      throw new HttpException('Measure unit not found', 404);
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const measureUnit = await this.measureUnitService.findOne(
      updateProductDto.unit,
    );

    await this.productRepository.update(id, {
      ...updateProductDto,
      unit: measureUnit,
    });

    const product = await this.productRepository.findOne({
      where: { id },
    });

    return product;
  }

  remove(id: string) {
    return this.productRepository.update(id, { deletedAt: new Date() });
  }
}
