import { Paginator } from '@/src/common/utils/paginator';
import { MeasureUnitService } from '@/src/modules/measure_unit/measure_unit.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dto/product/create-product.dto';
import { GetProductsFilterDto } from '../dto/product/get-product.dto';
import { UpdateProductDto } from '../dto/product/update-product.dto';
import { KosherDetails } from '../entities/kosher-details.entity';
import { Product } from '../entities/product.entity';
import { ProductionData } from '../entities/production-product-data.entity';
import { PurchaseData } from '../entities/purchase-product-data.entity';
import { ProductsFiltersHandler } from '../filters/products-filters.handler';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(PurchaseData)
    private purchaseDataRepository: Repository<PurchaseData>,
    @InjectRepository(ProductionData)
    private productionDataRepository: Repository<ProductionData>,
    @InjectRepository(KosherDetails)
    private kosherDetailsRepository: Repository<KosherDetails>,
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

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['purchaseData', 'kosherDetails', 'productionData'],
    });

    if (product.isPublished && updateProductDto.isDraft) {
      throw new HttpException(
        'This product is already processed and cannot be edited',
        HttpStatus.BAD_REQUEST,
      );
    }

    const measureUnit = await this.measureUnitService.findOne(
      updateProductDto.unitId,
    );

    updateProductDto.profileId = undefined;

    if (updateProductDto.purchaseData) {
      const purchaseData = await this.purchaseDataRepository.findOne({
        where: { id: product.purchaseData.id },
      });

      await this.purchaseDataRepository.update(purchaseData.id, {
        ...updateProductDto.purchaseData,
      });
    }
    delete updateProductDto.purchaseData;

    if (
      updateProductDto.productionData &&
      Object.keys(updateProductDto.productionData).length > 0
    ) {
      const productionData = await this.productionDataRepository.findOne({
        where: { id: product.productionData.id },
      });

      await this.productionDataRepository.update(productionData.id, {
        ...updateProductDto.productionData,
      });
    }
    delete updateProductDto.productionData;

    if (updateProductDto.kosherDetails) {
      const kosherDetails = await this.kosherDetailsRepository.findOne({
        where: { id: product.kosherDetails.id },
      });

      await this.kosherDetailsRepository.update(kosherDetails.id, {
        ...updateProductDto.kosherDetails,
      });
    }
    delete updateProductDto.kosherDetails;

    // Deleting non-valid UUIDs to avoid errors
    if (updateProductDto.profileId == '') delete updateProductDto.profileId;
    if (updateProductDto.productTypeId == '')
      delete updateProductDto.productTypeId;
    if (updateProductDto.providerId == '') delete updateProductDto.providerId;
    if (updateProductDto.unitId == '') delete updateProductDto.unitId;
    if (updateProductDto.departmentId == '')
      delete updateProductDto.departmentId;

    await this.productRepository.update(id, {
      ...updateProductDto,
      unit: measureUnit,
      id,
    });

    return await this.productRepository.findOne({
      where: { id },
    });
  }

  async findAll(filterDto: GetProductsFilterDto) {
    const { limit, offset, withDeleted } = filterDto;

    const query = this.productRepository.createQueryBuilder('product');
    const filterHandler = new ProductsFiltersHandler();

    query.leftJoinAndSelect('product.unit', 'measure_units');
    query.leftJoinAndSelect('product.kosherDetails', 'kosher_details');
    query.leftJoinAndSelect('product.purchaseData', 'purchase_data');
    query.leftJoinAndSelect('product.productionData', 'production_data');
    query.leftJoinAndSelect('product.provider', 'providers');
    query.leftJoinAndSelect('product.department', 'department');
    query.orderBy('product.partidaId', 'DESC');
    if (withDeleted === 'true') query.withDeleted();

    filterHandler.applyFilters(query, filterDto);

    const paginator = new Paginator<Product>();
    return await paginator.paginate(query, limit, offset);
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne({
      where: { id },
      withDeleted: false,
      relations: [
        'unit',
        'kosherDetails',
        'purchaseData',
        'productionData',
        'provider',
      ],
    });

    if (!product) {
      throw new HttpException('Measure unit not found', HttpStatus.NOT_FOUND);
    }

    return product;
  }

  async remove(id: string) {
    const product = await this.productRepository.findOne({
      where: { id },
    });

    await this.productRepository.update(id, { deletedAt: new Date() });

    return product;
  }
}
