// profile.dto.ts
import { IsEntityExist } from '@/src/common/decorators/dto/is_entity_exists/is_entity_exists.decorator';
import {
  DraftModeMixin,
  PaginationFilterMixin,
  SoftDeleteMixin,
} from '@/src/common/dto/pagination-base.dto';
import { Product } from '@/src/modules/product/entities/product.entity';
import { Warehouse } from '@/src/modules/warehouse/entities/warehouse.entity';
import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

class GetInventoryDto {
  // @IsNotEmpty()
  // @IsUUID()
  // @IsEntityExist(Product)
  // productId: string;

  @IsOptional()
  @IsUUID()
  @IsEntityExist(Warehouse)
  toId: string;

  @IsOptional()
  @IsUUID()
  @IsEntityExist(Warehouse)
  fromId: string;
}

export class GetInventoryFilterDto extends SoftDeleteMixin(
  PaginationFilterMixin(DraftModeMixin(GetInventoryDto)),
) {}
