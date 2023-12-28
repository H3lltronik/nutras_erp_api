import { PartialType } from '@nestjs/mapped-types';
import { CreatePurchaseRequisitionDto } from './create-purchase_requisition.dto';

export class UpdatePurchaseRequisitionDto extends PartialType(
  CreatePurchaseRequisitionDto,
) {}
