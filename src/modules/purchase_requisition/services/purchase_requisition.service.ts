import { Paginator } from '@/src/common/utils/paginator';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePurchaseRequisitionDto } from '../dto/purchase_requisition/create-purchase_requisition.dto';
import { GetPurchaseRequisitionsFilterDto } from '../dto/purchase_requisition/get-purchase_requisition.dto';
import { UpdatePurchaseRequisitionDto } from '../dto/purchase_requisition/update-purchase_requisition.dto';
import { PurchaseRequisition } from '../entities/purchase_requisition.entity';
import { PurchaseRequisitionProduct } from '../entities/purchase_requisition_product.entity';
import { PurchaseRequisitionsFiltersHandler } from '../filters/purchase_requisition-filters.handler';

@Injectable()
export class PurchaseRequisitionService {
  constructor(
    @InjectRepository(PurchaseRequisition)
    private purchaseRequisitionRepository: Repository<PurchaseRequisition>,
    @InjectRepository(PurchaseRequisitionProduct)
    private purchaseRequisitionProductRepository: Repository<PurchaseRequisitionProduct>,
  ) {}

  async create(
    createPurchaseRequisitionDto: CreatePurchaseRequisitionDto,
  ): Promise<PurchaseRequisition> {
    const { purchase_requisition_products, ...purchaseRequisitionData } =
      createPurchaseRequisitionDto;

    // Create and save the PurchaseRequisition
    const purchaseRequisition = this.purchaseRequisitionRepository.create(
      purchaseRequisitionData,
    );
    const savedPurchaseRequisition =
      await this.purchaseRequisitionRepository.save(purchaseRequisition);

    // Create and save each PurchaseRequisitionProduct
    if (purchase_requisition_products && purchase_requisition_products.length) {
      const products = purchase_requisition_products.map((productDto) => {
        return this.purchaseRequisitionProductRepository.create({
          ...productDto,
          purchase_requisition: savedPurchaseRequisition,
        });
      });
      await this.purchaseRequisitionProductRepository.save(products);
    }

    return savedPurchaseRequisition;
  }

  async update(
    id: string,
    updatePurchaseRequisitionDto: UpdatePurchaseRequisitionDto,
  ) {
    const purchaseRequisition =
      await this.purchaseRequisitionRepository.findOne({
        where: { id },
        relations: ['purchase_requisition_products'],
      });

    if (!purchaseRequisition) {
      throw new HttpException(
        'Purchase Requisition not found',
        HttpStatus.NOT_FOUND,
      );
    }

    if (updatePurchaseRequisitionDto.purchase_requisition_products) {
      // Handle updates to purchase requisition products here
      // This can involve updating existing products, adding new ones, and removing old ones.
    }

    Object.assign(purchaseRequisition, updatePurchaseRequisitionDto);
    await this.purchaseRequisitionRepository.save(purchaseRequisition);

    return await this.purchaseRequisitionRepository.findOne({
      where: { id },
      relations: ['purchase_requisition_products'],
    });
  }

  async findAll(filterDto: GetPurchaseRequisitionsFilterDto) {
    const { limit, offset, withDeleted } = filterDto;

    const query = this.purchaseRequisitionRepository.createQueryBuilder(
      'purchaseRequisition',
    );
    const filterHandler = new PurchaseRequisitionsFiltersHandler();

    query.orderBy('purchaseRequisition.partidaId', 'DESC');
    query.leftJoinAndSelect('purchaseRequisition.user', 'user');
    query.leftJoinAndSelect('purchaseRequisition.work_orders', 'work_orders');

    if (withDeleted === 'true') query.withDeleted();

    filterHandler.applyFilters(query, filterDto);

    const paginator = new Paginator<PurchaseRequisition>();
    return await paginator.paginate(query, limit, offset);
  }

  async findOne(id: string) {
    const purchaseRequisition =
      await this.purchaseRequisitionRepository.findOne({
        where: { id },
        withDeleted: false,
      });

    if (!purchaseRequisition) {
      throw new HttpException('Measure unit not found', HttpStatus.NOT_FOUND);
    }

    return purchaseRequisition;
  }

  async remove(id: string) {
    const purchaseRequisition =
      await this.purchaseRequisitionRepository.findOne({
        where: { id },
      });

    await this.purchaseRequisitionRepository.update(id, {
      deletedAt: new Date(),
    });

    return purchaseRequisition;
  }
}
