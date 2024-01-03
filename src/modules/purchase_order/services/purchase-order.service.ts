import { HttpException, Injectable } from '@nestjs/common';
import { CreatePurchaseOrderDto } from '../dto/purchase-order/create-purchase-order.dto';
import { UpdatePurchaseOrderDto } from '../dto/purchase-order/update-purchase-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PurchaseOrder } from '../entities/purchase-order.entity';
import { Batch, Repository } from 'typeorm';
import { Paginator } from '@/src/common/utils/paginator';
import { GetPurchaseOrdersFilterDto } from '../dto/purchase-order/get-purchase-order.dto';

@Injectable()
export class PurchaseOrderService {
  constructor(
    @InjectRepository(PurchaseOrder)
    private purchaseOrderRepository: Repository<PurchaseOrder>,
  ) {}

  async create(createPurchaseOrderDto: CreatePurchaseOrderDto) {
    return await this.purchaseOrderRepository.save(createPurchaseOrderDto);
  }

  async findAll(filterDto: GetPurchaseOrdersFilterDto) {
    const { limit, offset, withDeleted } = filterDto;

    const query = this.purchaseOrderRepository.createQueryBuilder('purchaseOrder');
    if (withDeleted === 'true') query.withDeleted();

    query.leftJoinAndSelect('purchaseOrder.workOrder', 'workOrder');
    query.leftJoinAndSelect('purchaseOrder.user', 'user');

    const paginator = new Paginator<PurchaseOrder>();
    return await paginator.paginate(query, limit, offset);
  }

  async findOne(id: string) {
    const purchaseOrder = await this.purchaseOrderRepository.findOne({
      where: { id },
      withDeleted: false,
    });

    if (!purchaseOrder) {
      throw new HttpException('Purchase order not found', 404);
    }

    return purchaseOrder;
  }

  async update(id: string, updatePurchaseOrderDto: UpdatePurchaseOrderDto) {
    await this.purchaseOrderRepository.update(id, updatePurchaseOrderDto);

    const purchaseOrder = await this.purchaseOrderRepository.findOne({
      where: { id },
    });

    return purchaseOrder;
  }

  remove(id: string) {
    return this.purchaseOrderRepository.update(id, { deletedAt: new Date() });
  }
}
