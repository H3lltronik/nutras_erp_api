import { Controller, Get, Param, Query } from '@nestjs/common';
import { GetInventoryFilterDto } from '../dto/inventory/get-inventory.dto';
import { InventoryService } from '../services/inventory.service';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}
  @Get()
  findAll(@Query() getInventoryFilterDto: GetInventoryFilterDto) {
    return this.inventoryService.findAll(getInventoryFilterDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inventoryService.find(id);
  }
}
