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
