import { Paginator } from '@/src/common/utils/paginator';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetProductTypesFilterDto } from '../dto/productType/get-product-types.dto';
import { ProductTypeCategory } from '../entities/product-type-category.entity';

@Injectable()
export class ProductTypeCategoryService {
  constructor(
    @InjectRepository(ProductTypeCategory)
    private productTypeRepository: Repository<ProductTypeCategory>,
  ) {}

  async autoUpdate(instanceToSave: Partial<ProductTypeCategory>) {
    const instanceFound = await this.productTypeRepository.findOne({
      where: { name: instanceToSave.name, productTypeId: instanceToSave.productTypeId },
    });
    if (instanceFound) {
      return this.productTypeRepository.update(instanceFound.id, instanceToSave);
    } else return this.productTypeRepository.save(instanceToSave);
  }

  async findAll(filterDto: GetProductTypesFilterDto) {
    const { limit, offset } = filterDto;

    const query =
      this.productTypeRepository.createQueryBuilder('productTypeCategory');

    const paginator = new Paginator<ProductTypeCategory>();
    return await paginator.paginate(query, limit, offset);
  }

  async findOne(id: string) {
    return await this.productTypeRepository.findOne({
      where: { id },
    });
  }
}
