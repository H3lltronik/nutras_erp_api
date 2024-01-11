import { Paginator } from '@/src/common/utils/paginator';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWorkRequestDto } from '../dto/work-order/create-work-request.dto';
import { GetWorkRequestsFilterDto } from '../dto/work-order/get-work-request.dto';
import { UpdateWorkRequestDto } from '../dto/work-order/update-work-request.dto';
import { WorkRequestProduct } from '../entities/work-request-products.entity';
import { WorkRequest } from '../entities/work-request.entity';
import { WorkRequestsFiltersHandler } from '../filters/work-request-filters.handler';

@Injectable()
export class WorkRequestService {
  constructor(
    @InjectRepository(WorkRequest)
    private workRequestRepository: Repository<WorkRequest>,
    @InjectRepository(WorkRequestProduct)
    private workRequestProductRepository: Repository<WorkRequestProduct>,
  ) {}

  async create(createWorkRequestDto: CreateWorkRequestDto) {
    const workRequestBaseData = JSON.parse(
      JSON.stringify(createWorkRequestDto),
    );
    delete workRequestBaseData.products;

    const workRequest = await this.workRequestRepository.save(
      workRequestBaseData,
    );

    const workRequestProducts = createWorkRequestDto.products.map(
      (product) => ({
        productId: product.id,
        quantity: product.quantity,
        workRequestId: workRequest.id,
      }),
    );

    await this.workRequestProductRepository.save(workRequestProducts);

    return await this.workRequestRepository.findOne({
      where: { id: workRequest.id },
      relations: ['products'],
    });
  }

  async update(id: string, updateWorkRequestDto: UpdateWorkRequestDto) {
    const workRequest = await this.workRequestRepository.findOne({
      where: { id },
    });

    if (!workRequest) {
      throw new HttpException('Work request not found', HttpStatus.NOT_FOUND);
    }

    // await this.workRequestRepository.update(id, {
    //   ...updateWorkRequestDto,
    //   id,
    // });

    // return await this.workRequestRepository.findOne({
    //   where: { id },
    // });

    // update this old way because of the workRequestProducts relation
    const workRequestBaseData = JSON.parse(
      JSON.stringify(updateWorkRequestDto),
    );

    delete workRequestBaseData.products;

    await this.workRequestRepository.update(id, workRequestBaseData);

    const workRequestProducts = updateWorkRequestDto.products.map(
      (product) => ({
        productId: product.id,
        quantity: product.quantity,
        workRequestId: id,
      }),
    );

    await this.workRequestProductRepository.delete({ workRequestId: id });
    await this.workRequestProductRepository.save(workRequestProducts);

    return await this.workRequestRepository.findOne({
      where: { id },
      relations: ['products'],
    });
  }

  async findAll(filterDto: GetWorkRequestsFilterDto) {
    const { limit, offset, withDeleted } = filterDto;

    const query = this.workRequestRepository.createQueryBuilder('workRequest');
    const filterHandler = new WorkRequestsFiltersHandler();

    query.orderBy('workRequest.partidaId', 'DESC');
    query.leftJoinAndSelect('workRequest.user', 'user');
    query.leftJoinAndSelect('workRequest.work_orders', 'work_orders');
    query.leftJoinAndSelect('workRequest.products', 'products');

    if (withDeleted === 'true') query.withDeleted();

    filterHandler.applyFilters(query, filterDto);

    const paginator = new Paginator<WorkRequest>();
    return await paginator.paginate(query, limit, offset);
  }

  async findOne(id: string) {
    const workRequest = await this.workRequestRepository.findOne({
      where: { id },
      withDeleted: false,
      relations: ['products', 'products.product'],
    });

    if (!workRequest) {
      throw new HttpException('Measure unit not found', HttpStatus.NOT_FOUND);
    }

    return workRequest;
  }

  async remove(id: string) {
    const workRequest = await this.workRequestRepository.findOne({
      where: { id },
    });

    await this.workRequestRepository.update(id, { deletedAt: new Date() });

    return workRequest;
  }
}
