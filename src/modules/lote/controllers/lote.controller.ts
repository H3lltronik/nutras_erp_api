import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LoteService } from '../services/lote.service';
import { CreateLoteDto } from '../dto/lote/create-lote.dto';
import { UpdateLoteDto } from '../dto/lote/update-lote.dto';

@Controller('lote')
export class LoteController {
  constructor(private readonly loteService: LoteService) {}

  @Post()
  create(@Body() createLoteDto: CreateLoteDto) {
    return this.loteService.create(createLoteDto);
  }

  @Get()
  findAll() {
    return this.loteService.findAll();
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
