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
import { CreateWorkRequestDto } from '../dto/work-order/create-work-request.dto';
import { GetWorkRequestsFilterDto } from '../dto/work-order/get-work-request.dto';
import { UpdateWorkRequestDto } from '../dto/work-order/update-work-request.dto';
import { WorkRequestService } from '../services/work-request.service';

@Controller('workRequests')
export class WorkRequestController {
  constructor(private readonly workRequestService: WorkRequestService) {}

  @Post()
  create(@Body() createWorkRequestDto: CreateWorkRequestDto) {
    return this.workRequestService.create(createWorkRequestDto);
  }

  @Get()
  async findAll(@Query() filterDto: GetWorkRequestsFilterDto) {
    const result = await this.workRequestService.findAll(filterDto);
    return {
      data: result.items,
      pagination: result.paginationMetadata,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workRequestService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWorkRequestDto: UpdateWorkRequestDto,
  ) {
    return this.workRequestService.update(id, updateWorkRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workRequestService.remove(id);
  }
}
