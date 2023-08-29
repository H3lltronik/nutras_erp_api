import { Paginator } from '@/src/common/utils/paginator';
import { MeasureUnitService } from '@/src/modules/measure_unit/measure_unit.service';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetUsersFilterDto } from '../../users/dtos/get-users.dto';
import { CreateProductDto } from '../dto/product/create-product.dto';
import { UpdateProductDto } from '../dto/product/update-product.dto';
import { Product } from '../entities/product.entity';
import { ProductsFiltersHandler } from '../filters/products-filters.handler';

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

  async findAll(filterDto: GetUsersFilterDto) {
    const { limit, offset } = filterDto;

    const query = this.productRepository.createQueryBuilder('product');
    const filterHandler = new ProductsFiltersHandler();

    filterHandler.applyFilters(query, filterDto);

    const paginator = new Paginator<Product>();
    return await paginator.paginate(query, limit, offset);
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
