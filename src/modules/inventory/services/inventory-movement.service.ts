import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInventoryMovementDto } from '../dto/inventory_movement/create-inventory-movement.dto';
import { UpdateInventoryMovementDto } from '../dto/inventory_movement/update-inventory-movement.dto';
import { InventoryMovement } from '../entities/inventory_movement.entity';

@Injectable()
export class InventoryMovementService {
  constructor(
    @InjectRepository(InventoryMovement)
    private inventoryMovementRepository: Repository<InventoryMovement>,
  ) {}

  async create(createInventoryMovementDto: CreateInventoryMovementDto) {
    return await this.inventoryMovementRepository.save(
      createInventoryMovementDto,
    );
  }

  findAll() {
    return this.inventoryMovementRepository.find({
      withDeleted: false,
      relations: ['fromId', 'toId'],
    });
  }

  async findOne(id: string) {
    const inventory = await this.inventoryMovementRepository.findOne({
      where: { id },
      withDeleted: false,
    });

    if (!inventory) {
      throw new HttpException('Measure unit not found', 404);
    }

    return inventory;
  }

  async update(
    id: string,
    updateInventoryMovementDto: UpdateInventoryMovementDto,
  ) {
    await this.inventoryMovementRepository.update(
      id,
      updateInventoryMovementDto,
    );

    const inventory = await this.inventoryMovementRepository.findOne({
      where: { id },
    });

    return inventory;
  }

  remove(id: string) {
    return this.inventoryMovementRepository.update(id, {
      deletedAt: new Date(),
    });
  }
}
