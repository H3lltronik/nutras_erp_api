import { IsEntityExist } from '@/src/common/decorators/dto/is_entity_exists/is_entity_exists.decorator';
import { Product } from '@/src/modules/product/entities/product.entity';
import { IsNotEmpty, IsUUID, IsInt, Min } from 'class-validator';

export class CreatePurchaseRequisitionProductDto {
  @IsNotEmpty()
  @IsUUID()
  @IsEntityExist(Product)
  product_id: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  quantity: number;
}
