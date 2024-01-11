import { Paginator } from '@/src/common/utils/paginator';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetInventoryMovementFilterDto } from '../dto/inventory_movement/get-inventory-movement.dto';
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

  async findAll(filterDto: GetInventoryMovementFilterDto) {
    const { limit, offset } = filterDto;
    const query =
      this.inventoryMovementLoteRepository.createQueryBuilder('product');

    query.leftJoinAndSelect('product.inventoryMovement', 'inventoryMovement');
    query.orderBy('product.partidaId', 'DESC');

    const paginator = new Paginator<InventoryMovementLote>();
    return await paginator.paginate(query, limit, offset);
  }

  async findOne(id: string) {
    const inventoryMovementLote =
      await this.inventoryMovementLoteRepository.findOne({
        where: { id },
        withDeleted: false,
        // relations: ['inventory_movement'],
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
