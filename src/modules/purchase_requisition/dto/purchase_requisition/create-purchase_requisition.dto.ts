import { IsEntityExist } from '@/src/common/decorators/dto/is_entity_exists/is_entity_exists.decorator';
import { User } from '@/src/modules/users/entities/user.entity';
import { WorkOrder } from '@/src/modules/work_order/entities/work-order.entity';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { CreatePurchaseRequisitionProductDto } from '../purchase_requisition_product/create-purchase_requisition_product.dto';

export class CreatePurchaseRequisitionDto {
  @IsOptional()
  @IsBoolean()
  isDraft?: boolean;

  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;

  @ValidateIf((o) => !o.isDraft)
  @IsNotEmpty()
  @IsUUID()
  @IsEntityExist(WorkOrder)
  work_order_id: string;

  @ValidateIf((o) => !o.isDraft)
  @IsNotEmpty()
  @IsUUID()
  @IsEntityExist(User)
  user_id: string;

  @ValidateIf((o) => !o.isDraft)
  @IsNotEmpty()
  motive: string;

  @ValidateIf((o) => !o.isDraft)
  @Type(() => CreatePurchaseRequisitionProductDto)
  @ValidateNested({ each: true })
  @ArrayNotEmpty()
  purchase_requisition_products: CreatePurchaseRequisitionProductDto[];
}
