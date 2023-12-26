import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { LoteService } from '../services/work-request.service';
import { CreateLoteDto } from '../dto/work-request/create-lote.dto';
import { UpdateLoteDto } from '../dto/work-request/update-lote.dto';
import { GetLotesFilterDto } from '../dto/work-request/get-lote.dto';

@Controller('lote')
export class LoteController {
  constructor(private readonly loteService: LoteService) {}

  @Post()
  create(@Body() createLoteDto: CreateLoteDto) {
    return this.loteService.create(createLoteDto);
  }

  @Get()
  findAll(@Query() filterDto: GetLotesFilterDto) {
    return this.loteService.findAll(filterDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loteService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLoteDto: UpdateLoteDto) {
    return this.loteService.update(id, updateLoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loteService.remove(id);
  }
}
