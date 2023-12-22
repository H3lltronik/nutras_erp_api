import { Controller, Get, Param } from '@nestjs/common';
import { MovementConceptService } from '../services/movement_concept.service';

@Controller('movement_concept')
export class MovementConceptController {
  constructor(
    private readonly movementConceptService: MovementConceptService,
  ) {}

  @Get()
  findAll() {
    return this.movementConceptService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movementConceptService.findOne(id);
  }
}
