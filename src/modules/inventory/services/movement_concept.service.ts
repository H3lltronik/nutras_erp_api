import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovementConcept } from '../entities/movement_concept.entity';

@Injectable()
export class MovementConceptService {
  constructor(
    @InjectRepository(MovementConcept)
    private movementConceptRepository: Repository<MovementConcept>,
  ) {}

  async findOrCreateByName(data: Partial<MovementConcept>) {
    const movementFound = await this.movementConceptRepository.findOne({
      where: { name: data.name }
    });
    if(!!movementFound) {
      await this.update(movementFound.id, data);
      return movementFound;
    }

    const newMovement = new MovementConcept();
    newMovement.name = data.name;
    newMovement.movementTypeId = data.movementTypeId;
    newMovement.originWarehouseId = data.originWarehouseId;
    newMovement.destinyWarehouseId = data.destinyWarehouseId;

    return this.movementConceptRepository.save(newMovement);
  }

  findAll() {
    return this.movementConceptRepository.find({
      relations: ['movementType', 'originWarehouse', 'destinyWarehouse'],
      withDeleted: false,
    });
  }

  async findOne(id: string) {
    const movementConcept = await this.movementConceptRepository.findOne({
      where: { id },
      relations: ['movementType'],
      withDeleted: false,
    });

    if (!movementConcept) {
      throw new HttpException('Movement concept not found', 404);
    }

    return movementConcept;
  }

  async update(id: string, data: Partial<MovementConcept>) {
    await this.movementConceptRepository.update(id, data);

    const movementConcept = await this.movementConceptRepository.findOne({
      where: { id },
      withDeleted: false,
    });

    return movementConcept;
  }

}
