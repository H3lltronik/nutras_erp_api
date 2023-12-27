import { Paginator } from '@/src/common/utils/paginator';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWorkOrderDto } from '../dto/work-order/create-work-order.dto';
import { GetWorkOrdersFilterDto } from '../dto/work-order/get-work-order.dto';
import { UpdateWorkOrderDto } from '../dto/work-order/update-work-order.dto';
import { WorkOrder } from '../entities/work-order.entity';
import { WorkOrdersFiltersHandler } from '../filters/work-order-filters.handler';

@Injectable()
export class WorkOrderService {
  constructor(
    @InjectRepository(WorkOrder)
    private workOrderRepository: Repository<WorkOrder>,
  ) {}

  async create(createWorkOrderDto: CreateWorkOrderDto) {
    return await this.workOrderRepository.save({
      ...createWorkOrderDto,
    });
  }

  async update(id: string, updateWorkOrderDto: UpdateWorkOrderDto) {
    const workOrder = await this.workOrderRepository.findOne({
      where: { id },
    });

    if (!workOrder) {
      throw new HttpException('Work order not found', HttpStatus.NOT_FOUND);
    }

    await this.workOrderRepository.update(id, {
      ...updateWorkOrderDto,
      id,
    });

    return await this.workOrderRepository.findOne({
      where: { id },
    });
  }

  async findAll(filterDto: GetWorkOrdersFilterDto) {
    const { limit, offset, withDeleted } = filterDto;

    const query = this.workOrderRepository.createQueryBuilder('workOrder');
    const filterHandler = new WorkOrdersFiltersHandler();

    query.orderBy('workOrder.partidaId', 'DESC');
    query.leftJoinAndSelect('workOrder.user', 'user');
    query.leftJoinAndSelect('workOrder.work_request', 'work_request');
    query.leftJoinAndSelect('workOrder.product', 'product');
    query.leftJoinAndSelect('workOrder.service_type', 'service_type');
    if (withDeleted === 'true') query.withDeleted();

    filterHandler.applyFilters(query, filterDto);

    const paginator = new Paginator<WorkOrder>();
    return await paginator.paginate(query, limit, offset);
  }

  async findOne(id: string) {
    const workOrder = await this.workOrderRepository.findOne({
      where: { id },
      withDeleted: false,
    });

    if (!workOrder) {
      throw new HttpException('Measure unit not found', HttpStatus.NOT_FOUND);
    }

    return workOrder;
  }

  async remove(id: string) {
    const workOrder = await this.workOrderRepository.findOne({
      where: { id },
    });

    await this.workOrderRepository.update(id, { deletedAt: new Date() });

    return workOrder;
  }
}
