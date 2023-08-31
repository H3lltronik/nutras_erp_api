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
import { GetUsersFilterDto } from '../users/dtos/get-users.dto';
import { CreateMeasureUnitDto } from './dto/create-measure_unit.dto';
import { UpdateMeasureUnitDto } from './dto/update-measure_unit.dto';
import { MeasureUnitService } from './measure_unit.service';

@Controller('measure-unit')
export class MeasureUnitController {
  constructor(private readonly measureUnitService: MeasureUnitService) {}

  @Post()
  create(@Body() createMeasureUnitDto: CreateMeasureUnitDto) {
    return this.measureUnitService.create(createMeasureUnitDto);
  }

  @Get()
  async findAll(@Query() filterDto: GetUsersFilterDto) {
    const result = await this.measureUnitService.findAll(filterDto);
    return {
      data: result.items,
      pagination: result.paginationMetadata,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.measureUnitService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMeasureUnitDto: UpdateMeasureUnitDto,
  ) {
    return this.measureUnitService.update(id, updateMeasureUnitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.measureUnitService.remove(id);
  }
}
