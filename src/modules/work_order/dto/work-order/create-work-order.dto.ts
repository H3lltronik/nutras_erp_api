import { IsEntityExist } from '@/src/common/decorators/dto/is_entity_exists/is_entity_exists.decorator';
import { WorkRequest } from '@/src/modules/work_request/entities/work-request.entity';
import { IsBoolean, IsNotEmpty, IsOptional, ValidateIf } from 'class-validator';
import { WorkOrderServiceType } from '../../entities/work-order-service-type.entity';

export class CreateWorkOrderDto {
  @IsOptional()
  @IsBoolean()
  isDraft?: boolean;

  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;

  @ValidateIf((o) => !o.isDraft)
  @IsNotEmpty()
  folio: string;

  @ValidateIf((o) => !o.isDraft)
  @IsNotEmpty()
  clientRequestDate: Date;

  @ValidateIf((o) => !o.isDraft)
  @IsNotEmpty()
  internDueDate: Date;

  @ValidateIf((o) => !o.isDraft)
  @IsNotEmpty()
  userId: string;

  @ValidateIf((o) => !o.isDraft)
  @IsNotEmpty()
  productId: string;

  @ValidateIf((o) => !o.isDraft)
  @IsNotEmpty()
  notes: string;

  @ValidateIf((o) => !o.isDraft)
  @IsNotEmpty()
  @IsEntityExist(WorkOrderServiceType)
  service_type_id: string;

  @ValidateIf((o) => !o.isDraft)
  @IsNotEmpty()
  @IsEntityExist(WorkRequest)
  work_request_id: string;
}
