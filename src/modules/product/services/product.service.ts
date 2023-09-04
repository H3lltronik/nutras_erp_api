import { Paginator } from '@/src/common/utils/paginator';
import { MeasureUnitService } from '@/src/modules/measure_unit/measure_unit.service';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dto/product/create-product.dto';
import { GetProductsFilterDto } from '../dto/product/get-product.dto';
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
      createProductDto.unitId,
    );

    return await this.productRepository.save({
      ...createProductDto,
      unit: measureUnit,
    });
  }

  async findAll(filterDto: GetProductsFilterDto) {
    const { limit, offset } = filterDto;

    const query = this.productRepository.createQueryBuilder('product');
    const filterHandler = new ProductsFiltersHandler();

    query.leftJoinAndSelect('product.unit', 'measure_units');
    query.orderBy('product.partidaId', 'DESC');

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
    const product = await this.productRepository.findOne({
      where: { id },
    });

    if (product.isPublished && updateProductDto.isDraft) {
      throw new HttpException(
        'This product is already processed and cannot be edited',
        400,
      );
    }

    const measureUnit = await this.measureUnitService.findOne(
      updateProductDto.unitId,
    );

    await this.productRepository.update(id, {
      ...updateProductDto,
      unit: measureUnit,
    });

    return await this.productRepository.findOne({
      where: { id },
    });
  }

  async remove(id: string) {
    const product = await this.productRepository.findOne({
      where: { id },
    });

    await this.productRepository.update(id, { deletedAt: new Date() });

    return product;
  }
}
