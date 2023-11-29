import { IsEntityExist } from '@/src/common/decorators/dto/is_entity_exists/is_entity_exists.decorator';
import { Warehouse } from '@/src/modules/warehouse/entities/warehouse.entity';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateInventoryMovementDto {
  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  ot_id: string;

  @IsNotEmpty()
  reason: string;

  @IsNotEmpty()
  @IsUUID()
  @IsEntityExist(Warehouse)
  fromId: string;

  @IsNotEmpty()
  @IsUUID()
  @IsEntityExist(Warehouse)
  toId: string;
}
