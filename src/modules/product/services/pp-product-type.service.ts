import { Paginator } from '@/src/common/utils/paginator';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetProductTypesFilterDto } from '../dto/productType/get-product-types.dto';
import { PPProductType } from '../entities/pp-product-type.entity';

@Injectable()
export class PPProductsTypeService {
  constructor(
    @InjectRepository(PPProductType)
    private productTypeRepository: Repository<PPProductType>,
  ) {}

  async findAll(filterDto: GetProductTypesFilterDto) {
    const { limit, offset } = filterDto;

    const query =
      this.productTypeRepository.createQueryBuilder('ppProductType');

    const paginator = new Paginator<PPProductType>();
    return await paginator.paginate(query, limit, offset);
  }

  async findOne(id: string) {
    return await this.productTypeRepository.findOne({
      where: { id },
    });
  }
}
