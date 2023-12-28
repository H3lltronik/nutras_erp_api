import { Controller, Get, Param, Query } from '@nestjs/common';
import { GetWorkOrderServiceTypesDto } from '../dto/work-order-service-type/get-work-order-service-type.dto';
import { WorkOrderServiceTypesService } from '../services/work-order-service-type.service';

@Controller('work-order-service-types')
export class WorkOrderServiceTypesController {
  constructor(
    private readonly workOrderServiceTypeService: WorkOrderServiceTypesService,
  ) {}

  @Get()
  async findAll(@Query() filterDto: GetWorkOrderServiceTypesDto) {
    const result = await this.workOrderServiceTypeService.findAll(filterDto);
    return {
      data: result.items,
      pagination: result.paginationMetadata,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workOrderServiceTypeService.findOne(id);
  }
}
