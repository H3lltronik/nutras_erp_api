import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovementType } from '../entities/movement_type.entity';

@Injectable()
export class MovementTypeService {
  constructor(
    @InjectRepository(MovementType)
    private movementTypeRepository: Repository<MovementType>,
  ) {}

  async findAll() {
    return this.movementTypeRepository.find({
      withDeleted: true,
    });
  }

  async findOrCreateByName(data: Partial<MovementType>) {
    const movementFound = await this.movementTypeRepository.findOne({
      where: { name: data.name },
    });
    if(movementFound) {
      movementFound.name = data.name;
      movementFound.action = data.action;
      return this.movementTypeRepository.save(movementFound);
    }
    const movementType = this.movementTypeRepository.create(data);
    return this.movementTypeRepository.save(movementType);
  }

  async findOne(id: string) {
    const movementType = await this.movementTypeRepository.findOne({
      where: { id },
      withDeleted: false,
    });

    if (!movementType) {
      throw new HttpException('Movement type not found', 404);
    }

    return movementType;
  }
}
