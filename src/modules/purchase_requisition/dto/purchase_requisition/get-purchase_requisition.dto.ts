// profile.dto.ts
import {
  DraftModeMixin,
  PaginationFilterMixin,
  SoftDeleteMixin,
} from '@/src/common/dto/pagination-base.dto';
import { IsOptional, IsString } from 'class-validator';

class GetPurchaseRequisitionsFilterFields {
  @IsOptional()
  @IsString()
  search?: string;
}

export class GetPurchaseRequisitionsFilterDto extends SoftDeleteMixin(
  PaginationFilterMixin(DraftModeMixin(GetPurchaseRequisitionsFilterFields)),
) {}
