import { IsEntityExist } from '@/src/common/decorators/dto/is_entity_exists/is_entity_exists.decorator';
import { User } from '@/src/modules/users/entities/user.entity';
import { WorkOrder } from '@/src/modules/work_order/entities/work-order.entity';
import { IsBoolean, IsNotEmpty, IsOptional, ValidateIf } from 'class-validator';

export class CreatePurchaseRequisitionDto {
  @IsOptional()
  @IsBoolean()
  isDraft?: boolean;

  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;

  @ValidateIf((o) => !o.isDraft)
  @IsNotEmpty()
  @IsEntityExist(WorkOrder)
  work_order_id: string;

  @ValidateIf((o) => !o.isDraft)
  @IsNotEmpty()
  @IsEntityExist(User)
  user_id: string;

  @ValidateIf((o) => !o.isDraft)
  @IsNotEmpty()
  motive: string;
}
