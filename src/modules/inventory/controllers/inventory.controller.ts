import { Controller, Get, Param, Query } from '@nestjs/common';
import { GetInventoryFilterDto } from '../dto/inventory/get-inventory.dto';
import { InventoryService } from '../services/inventory.service';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}
  @Get()
  findAll() {
    return this.inventoryService.findAll();
  }

  @Get('/product/:id')
  findOne(
    @Param('id') id: string,
    @Query() getInventoryFilterDto: GetInventoryFilterDto,
  ) {
    return this.inventoryService.findByProduct(id, getInventoryFilterDto);
  }
}
