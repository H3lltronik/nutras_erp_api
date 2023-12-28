import { Paginator } from '@/src/common/utils/paginator';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePurchaseRequisitionDto } from '../dto/purchase_requisition/create-purchase_requisition.dto';
import { GetPurchaseRequisitionsFilterDto } from '../dto/purchase_requisition/get-purchase_requisition.dto';
import { UpdatePurchaseRequisitionDto } from '../dto/purchase_requisition/update-purchase_requisition.dto';
import { PurchaseRequisition } from '../entities/purchase_requisition.entity';
import { PurchaseRequisitionsFiltersHandler } from '../filters/purchase_requisition-filters.handler';

@Injectable()
export class PurchaseRequisitionService {
  constructor(
    @InjectRepository(PurchaseRequisition)
    private purchaseRequisitionRepository: Repository<PurchaseRequisition>,
  ) {}

  async create(createPurchaseRequisitionDto: CreatePurchaseRequisitionDto) {
    return await this.purchaseRequisitionRepository.save({
      ...createPurchaseRequisitionDto,
    });
  }

  async update(
    id: string,
    updatePurchaseRequisitionDto: UpdatePurchaseRequisitionDto,
  ) {
    const purchaseRequisition =
      await this.purchaseRequisitionRepository.findOne({
        where: { id },
      });

    if (!purchaseRequisition) {
      throw new HttpException('Work request not found', HttpStatus.NOT_FOUND);
    }

    await this.purchaseRequisitionRepository.update(id, {
      ...updatePurchaseRequisitionDto,
      id,
    });

    return await this.purchaseRequisitionRepository.findOne({
      where: { id },
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
