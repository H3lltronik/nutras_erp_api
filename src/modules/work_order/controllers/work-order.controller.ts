import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateWorkOrderDto } from '../dto/work-order/create-work-order.dto';
import { GetWorkOrdersFilterDto } from '../dto/work-order/get-work-order.dto';
import { UpdateWorkOrderDto } from '../dto/work-order/update-work-order.dto';
import { WorkOrderService } from '../services/work-order.service';

@Controller('workOrders')
export class WorkOrderController {
  constructor(private readonly workOrderService: WorkOrderService) {}

  @Post()
  create(@Body() createWorkOrderDto: CreateWorkOrderDto) {
    return this.workOrderService.create(createWorkOrderDto);
  }

  @Get()
  async findAll(@Query() filterDto: GetWorkOrdersFilterDto) {
    const result = await this.workOrderService.findAll(filterDto);
    return {
      data: result.items,
      pagination: result.paginationMetadata,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workOrderService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWorkOrderDto: UpdateWorkOrderDto,
  ) {
    return this.workOrderService.update(id, updateWorkOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workOrderService.remove(id);
  }
}
