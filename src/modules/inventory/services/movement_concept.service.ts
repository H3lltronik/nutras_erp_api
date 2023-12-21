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

  findOrCreateByName(data: Partial<MovementConcept>) {
    const movementFound = this.movementConceptRepository.exist({
      where: { name: data.name }
    });
    if(movementFound) return movementFound;
    const movementConcept = this.movementConceptRepository.create(data);
    return this.movementConceptRepository.save(movementConcept);
  }

  findAll() {
    return this.movementConceptRepository.find({
      withDeleted: false,
    });
  }

  async findOne(id: string) {
    const movementConcept = await this.movementConceptRepository.findOne({
      where: { id },
      withDeleted: false,
    });

    if (!movementConcept) {
      throw new HttpException('Movement concept not found', 404);
    }

    return movementConcept;
  }
}
