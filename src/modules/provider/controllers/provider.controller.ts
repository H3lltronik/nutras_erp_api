import { DatabaseExceptionFilter } from '@/src/common/filters/DatabaseExceptionFilter';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseFilters,
} from '@nestjs/common';
import { CreateProviderDto } from '../dto/provider/create-provider.dto';
import { GetProvidersFilterDto } from '../dto/provider/get-provider.dto';
import { UpdateProviderDto } from '../dto/provider/update-provider.dto';
import { ProviderService } from '../services/provider.service';

@Controller('providers')
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  @Post()
  @UseFilters(new DatabaseExceptionFilter())
  create(@Body() createProviderDto: CreateProviderDto) {
    return this.providerService.create(createProviderDto);
  }

  @Get()
  async findAll(@Query() filterDto: GetProvidersFilterDto) {
    const result = await this.providerService.findAll(filterDto);
    return {
      data: result.items,
      pagination: result.paginationMetadata,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.providerService.findOne(id);
  }

  @Patch(':id')
  @UseFilters(new DatabaseExceptionFilter())
  update(
    @Param('id') id: string,
    @Body() updateProviderDto: UpdateProviderDto,
  ) {
    return this.providerService.update(id, updateProviderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.providerService.remove(id);
  }
}
