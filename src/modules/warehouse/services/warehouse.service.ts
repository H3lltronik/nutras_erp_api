import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWarehouseDto } from '../dto/warehouse/create-warehouse.dto';
import { UpdateWarehouseDto } from '../dto/warehouse/update-warehouse.dto';
import { Warehouse } from '../entities/warehouse.entity';

@Injectable()
export class WarehouseService {
  constructor(
    @InjectRepository(Warehouse)
    private warehouseRepository: Repository<Warehouse>,
  ) {}

  async create(createWarehouseDto: CreateWarehouseDto) {
    return await this.warehouseRepository.save(createWarehouseDto);
  }

  findAll() {
    return this.warehouseRepository.find({
      // where: { hidden: false },
      withDeleted: false,
      relations: [],
    });
  }

  async findOne(id: string) {
    const warehouse = await this.warehouseRepository.findOne({
      where: { id },
      withDeleted: false,
    });

    if (!warehouse) {
      throw new HttpException('Measure unit not found', 404);
    }

    return warehouse;
  }

  async update(id: string, updateWarehouseDto: UpdateWarehouseDto) {
    await this.warehouseRepository.update(id, updateWarehouseDto);

    const warehouse = await this.warehouseRepository.findOne({
      where: { id },
    });

    return warehouse;
  }

  remove(id: string) {
    return this.warehouseRepository.update(id, { deletedAt: new Date() });
  }
}
