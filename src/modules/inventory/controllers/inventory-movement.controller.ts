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
import { CreateInventoryMovementDto } from '../dto/inventory_movement/create-inventory-movement.dto';
import { GetInventoryMovementFilterDto } from '../dto/inventory_movement/get-inventory-movement.dto';
import { UpdateInventoryMovementDto } from '../dto/inventory_movement/update-inventory-movement.dto';
import { InventoryMovementService } from '../services/inventory-movement.service';

@Controller('inventory-movement')
export class InventoryMovementController {
  constructor(
    private readonly InventoryMovementService: InventoryMovementService,
  ) {}

  @Post()
  create(@Body() createInventoryMovementDto: CreateInventoryMovementDto) {
    return this.InventoryMovementService.create(createInventoryMovementDto);
  }

  @Get()
  findAll(@Query() filterDto: GetInventoryMovementFilterDto) {
    return this.InventoryMovementService.findAll(filterDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.InventoryMovementService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInventoryMovementDto: UpdateInventoryMovementDto,
  ) {
    return this.InventoryMovementService.update(id, updateInventoryMovementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.InventoryMovementService.remove(id);
  }
}
