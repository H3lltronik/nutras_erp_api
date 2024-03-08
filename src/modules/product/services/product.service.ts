import { Paginator } from '@/src/common/utils/paginator';
import { MeasureUnitService } from '@/src/modules/measure_unit/measure_unit.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { CreateProductDto } from '../dto/product/create-product.dto';
import { GetProductsFilterDto } from '../dto/product/get-product.dto';
import { UpdateProductDto } from '../dto/product/update-product.dto';
import { KosherDetails } from '../entities/kosher-details.entity';
import { Product } from '../entities/product.entity';
import { ProductionData } from '../entities/production-product-data.entity';
import { PurchaseData } from '../entities/purchase-product-data.entity';
import { ProductsFiltersHandler } from '../filters/products-filters.handler';
import { ProductTypeCategoryService } from './product-type-category.service';
import { ProductsTypeService } from './product-type.service';

// WAREHOUSE
const generalWarehouseId = '621b95b5-6320-4e62-8b9d-4bc068867ee6';
const productionWarehouseId = '5606d5cd-e764-4478-bd2e-639cfb0a90b9';

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
    private productTypeService: ProductsTypeService,
    private prouctTypeCategoryService: ProductTypeCategoryService,
  ) {}

  public async verifyProductCode(product: CreateProductDto | UpdateProductDto | Product) {
    const productType = await this.productTypeService.findOne(
      product.productTypeId,
    );
    const productTypeCategory = await this.prouctTypeCategoryService.findOne(
      product.productTypeCategoryId,
    );
    let completeCode = `${productType.name}${product.code}${productTypeCategory?.suffix ?? ''}`;
    const productFound = await this.productRepository.findOne({
      where: { completeCode },
    });
    if (productFound) {
      throw new HttpException(
        'El código de producto ya existe',
        HttpStatus.BAD_REQUEST,
      );
    }
    return completeCode;
  }

  async create(createProductDto: CreateProductDto) {
    const measureUnit = await this.measureUnitService.findOne(
      createProductDto.unitId,
    );
    
    try {
      const completeCode = await this.verifyProductCode(createProductDto);
      return await this.productRepository.save({
        ...createProductDto,
        completeCode,
        unit: measureUnit,
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }

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

      try {
        if (Object.keys(updateProductDto.purchaseData).length > 0) {
          await this.purchaseDataRepository.update(purchaseData.id, {
            ...updateProductDto.purchaseData,
          });
        }
      } catch (error) {
        console.log('Error updating purchase data', error);
        // throw new HttpException(
        //   'Error updating purchase data',
        //   HttpStatus.BAD_REQUEST,
        // );
      }
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
    query.leftJoinAndSelect('product.provider', 'provider');
    query.leftJoinAndSelect('product.department', 'department');
    query.leftJoinAndSelect('product.productType', 'productType');
    query.leftJoinAndSelect(
      'product.productTypeCategory',
      'productTypeCategory',
    );
    query.orderBy('product.partidaId', 'DESC');
    if (withDeleted === 'true') query.withDeleted();

    filterHandler.applyFilters(query, filterDto);

    const paginator = new Paginator<Product>();
    return await paginator.paginate(query, limit, offset);
  }

  async findAllWithBatches(filterDto: GetProductsFilterDto) {
    const { limit, offset, withDeleted } = filterDto;

    const query = this.productRepository.createQueryBuilder('product');
    const filterHandler = new ProductsFiltersHandler();

    query.leftJoinAndSelect('product.unit', 'measure_units');
    query.leftJoinAndSelect('product.kosherDetails', 'kosher_details');
    query.leftJoinAndSelect('product.purchaseData', 'purchase_data');
    query.leftJoinAndSelect('product.productionData', 'production_data');
    query.leftJoinAndSelect('product.provider', 'providers');
    query.leftJoinAndSelect('product.department', 'department');
    query.leftJoinAndSelect('product.lotes', 'lotes');
    query.where(
      new Brackets((qb) => {
        qb.where(`lotes.wharehouseId = '${generalWarehouseId}'`).orWhere(
          `lotes.wharehouseId = '${productionWarehouseId}'`,
        );
      }),
    );

    query
      .orderBy('product.partidaId', 'DESC')
      .orderBy('lotes.createdAt', 'DESC');
    if (withDeleted === 'true') query.withDeleted();

    // Add filter for lote relation

    filterHandler.applyFilters(query, filterDto);

    const paginator = new Paginator<Product>();
    return await paginator.paginate(query, limit, offset);
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne({
      where: { id },
      withDeleted: true,
      relations: [
        'unit',
        'kosherDetails',
        'purchaseData',
        'productionData',
        'provider',
        'productType',
      ],
    });

    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
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
