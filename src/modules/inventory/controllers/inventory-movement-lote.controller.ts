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
import { GetInventoryMovementFilterDto } from '../dto/inventory_movement/get-inventory-movement.dto';
import { CreateInventoryMovementLoteDto } from '../dto/inventory_movement_lote/create-inventory-movement-lote.dto';
import { UpdateInventoryMovementLoteDto } from '../dto/inventory_movement_lote/update-inventory-movement-lote.dto';
import { InventoryMovementLoteService } from '../services/inventory-movement-lote.service';

@Controller('inventory-movement-lote')
export class InventoryMovementLoteController {
  constructor(
    private readonly inventoryMovementLoteService: InventoryMovementLoteService,
  ) {}

  @Post()
  create(
    @Body() createInventoryMovementLoteDto: CreateInventoryMovementLoteDto,
  ) {
    return this.inventoryMovementLoteService.create(
      createInventoryMovementLoteDto,
    );
  }

  @Get()
  findAll(@Query() filterDto: GetInventoryMovementFilterDto) {
    return this.inventoryMovementLoteService.findAll(filterDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inventoryMovementLoteService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInventoryMovementLoteDto: UpdateInventoryMovementLoteDto,
  ) {
    return this.inventoryMovementLoteService.update(
      id,
      updateInventoryMovementLoteDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inventoryMovementLoteService.remove(id);
  }
}
