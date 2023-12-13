import { Controller, Get, Param } from '@nestjs/common';
import { MovementTypeService } from '../services/movement_type.service';

@Controller('movement_type')
export class MovementTypeController {
  constructor(private readonly movementTypeService: MovementTypeService) {}

  @Get()
  findAll() {
    return this.movementTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movementTypeService.findOne(id);
  }
}
