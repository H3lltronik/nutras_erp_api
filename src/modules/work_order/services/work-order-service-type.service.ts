import { Paginator } from '@/src/common/utils/paginator';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetWorkOrderServiceTypesDto } from '../dto/work-order-service-type/get-work-order-service-type.dto';
import { WorkOrderServiceType } from '../entities/work-order-service-type.entity';
import { WorkOrderServiceTypesFiltersHandler } from '../filters/work-order-service-types-filters.handler';

@Injectable()
export class WorkOrderServiceTypesService {
  constructor(
    @InjectRepository(WorkOrderServiceType)
    private workOrderServiceTypesRepository: Repository<WorkOrderServiceType>,
  ) {}

  async findAll(filterDto: GetWorkOrderServiceTypesDto) {
    const { limit, offset, withDeleted } = filterDto;

    const query = this.workOrderServiceTypesRepository.createQueryBuilder(
      'workOrderServiceTypes',
    );
    const filterHandler = new WorkOrderServiceTypesFiltersHandler();

    query.orderBy('workOrderServiceTypes.partidaId', 'DESC');
    if (withDeleted === 'true') query.withDeleted();

    filterHandler.applyFilters(query, filterDto);

    const paginator = new Paginator<WorkOrderServiceType>();
    return await paginator.paginate(query, limit, offset);
  }

  async findOne(id: string) {
    const workOrderServiceTypes =
      await this.workOrderServiceTypesRepository.findOne({
        where: { id },
        withDeleted: false,
      });

    if (!workOrderServiceTypes) {
      throw new HttpException('Measure unit not found', HttpStatus.NOT_FOUND);
    }

    return workOrderServiceTypes;
  }
}
