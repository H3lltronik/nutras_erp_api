import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInventoryMovementLoteDto } from '../dto/inventory_movement_lote/create-inventory-movement-lote.dto';
import { UpdateInventoryMovementLoteDto } from '../dto/inventory_movement_lote/update-inventory-movement-lote.dto';
import { InventoryMovementLote } from '../entities/inventory_movement_lote.entity';

@Injectable()
export class InventoryMovementLoteService {
  constructor(
    @InjectRepository(InventoryMovementLote)
    private inventoryMovementLoteRepository: Repository<InventoryMovementLote>,
  ) {}

  async create(createInventoryMovementLoteDto: CreateInventoryMovementLoteDto) {
    return await this.inventoryMovementLoteRepository.save(
      createInventoryMovementLoteDto,
    );
  }

  findAll() {
    return this.inventoryMovementLoteRepository.find({
      withDeleted: false,
      relations: ['inventory_movement'],
    });
  }

  async findOne(id: string) {
    const inventoryMovementLote =
      await this.inventoryMovementLoteRepository.findOne({
        where: { id },
        withDeleted: false,
        relations: ['inventory_movement'],
      });

    if (!inventoryMovementLote) {
      throw new HttpException('Measure unit not found', 404);
    }

    return inventoryMovementLote;
  }

  async update(
    id: string,
    updateInventoryMovementLoteDto: UpdateInventoryMovementLoteDto,
  ) {
    await this.inventoryMovementLoteRepository.update(
      id,
      updateInventoryMovementLoteDto,
    );

    const inventoryMovementLote =
      await this.inventoryMovementLoteRepository.findOne({
        where: { id },
      });

    return inventoryMovementLote;
  }

  remove(id: string) {
    return this.inventoryMovementLoteRepository.update(id, {
      deletedAt: new Date(),
    });
  }
}
