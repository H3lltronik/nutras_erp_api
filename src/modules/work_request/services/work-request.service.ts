import { Paginator } from '@/src/common/utils/paginator';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWorkRequestDto } from '../dto/work-order/create-work-request.dto';
import { GetWorkRequestsFilterDto } from '../dto/work-order/get-work-request.dto';
import { UpdateWorkRequestDto } from '../dto/work-order/update-work-request.dto';
import { WorkRequest } from '../entities/work-request.entity';
import { WorkRequestsFiltersHandler } from '../filters/work-request-filters.handler';

@Injectable()
export class WorkRequestService {
  constructor(
    @InjectRepository(WorkRequest)
    private workRequestRepository: Repository<WorkRequest>,
  ) {}

  async create(createWorkRequestDto: CreateWorkRequestDto) {
    return await this.workRequestRepository.save({
      ...createWorkRequestDto,
    });
  }

  async update(id: string, updateWorkRequestDto: UpdateWorkRequestDto) {
    const workRequest = await this.workRequestRepository.findOne({
      where: { id },
    });

    if (!workRequest) {
      throw new HttpException('Work request not found', HttpStatus.NOT_FOUND);
    }

    await this.workRequestRepository.update(id, {
      ...updateWorkRequestDto,
      id,
    });

    return await this.workRequestRepository.findOne({
      where: { id },
    });
  }

  async findAll(filterDto: GetWorkRequestsFilterDto) {
    const { limit, offset, withDeleted } = filterDto;

    const query = this.workRequestRepository.createQueryBuilder('workRequest');
    const filterHandler = new WorkRequestsFiltersHandler();

    query.orderBy('workRequest.partidaId', 'DESC');
    query.leftJoinAndSelect('workRequest.user', 'user');
    query.leftJoinAndSelect('workRequest.work_orders', 'work_orders');

    if (withDeleted === 'true') query.withDeleted();

    filterHandler.applyFilters(query, filterDto);

    const paginator = new Paginator<WorkRequest>();
    return await paginator.paginate(query, limit, offset);
  }

  async findOne(id: string) {
    const workRequest = await this.workRequestRepository.findOne({
      where: { id },
      withDeleted: false,
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
