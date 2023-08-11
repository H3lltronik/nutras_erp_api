import { HttpException, Injectable } from '@nestjs/common';
import { CreateInventoryDto } from '../dto/inventory/create-inventory.dto';
import { UpdateInventoryDto } from '../dto/inventory/update-inventory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from '../entities/inventory.entity';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
  ) {}

  async create(createInventoryDto: CreateInventoryDto) {
    return await this.inventoryRepository.save(createInventoryDto);
  }

  findAll() {
    return this.inventoryRepository.find({
      withDeleted: false,
      relations: ['lote', 'warehouse'],
    });
  }

  async findOne(id: string) {
    const inventory = await this.inventoryRepository.findOne({
      where: { id },
      withDeleted: false,
      relations: ['lote', 'warehouse'],
    });

    if (!inventory) {
      throw new HttpException('Inventory unit not found', 404);
    }

    return inventory;
  }

  async update(id: string, updateInventoryDto: UpdateInventoryDto) {
    await this.inventoryRepository.update(id, updateInventoryDto);

    const inventory = await this.inventoryRepository.findOne({
      where: { id },
    });

    return inventory;
  }

  remove(id: string) {
    return this.inventoryRepository.update(id, { deletedAt: new Date() });
  }
}
