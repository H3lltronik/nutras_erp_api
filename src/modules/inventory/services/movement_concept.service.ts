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
    const movementFound = await this.movementConceptRepository.exist({
      where: { name: data.name }
    });
    if(movementFound) return movementFound;

    const newMovement = new MovementConcept();
    newMovement.name = data.name;
    newMovement.movementTypeId = data.movementTypeId;

    return this.movementConceptRepository.save(newMovement);
  }

  findAll() {
    return this.movementConceptRepository.find({
      relations: ['movementType'],
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
}
