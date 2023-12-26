import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateLoteDto } from '../dto/work-request/create-lote.dto';
import { UpdateLoteDto } from '../dto/work-request/update-lote.dto';
import { LoteEntryTypeService } from '../services/work-request-entry-type.service';

@Controller('lote-entry-type')
export class LoteEntryTypeController {
  constructor(private readonly loteEntryTypeService: LoteEntryTypeService) {}

  @Post()
  create(@Body() createLoteDto: CreateLoteDto) {
    return this.loteEntryTypeService.create(createLoteDto);
  }

  @Get()
  findAll() {
    return this.loteEntryTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loteEntryTypeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLoteDto: UpdateLoteDto) {
    return this.loteEntryTypeService.update(id, updateLoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loteEntryTypeService.remove(id);
  }
}
