// profile.dto.ts
import {
  DraftModeMixin,
  PaginationFilterMixin,
  SoftDeleteMixin,
} from '@/src/common/dto/pagination-base.dto';
import { IsOptional, IsString } from 'class-validator';

class GetPurchaseOrdersFilterFields {
  @IsOptional()
  @IsString()
  search?: string;
}

export class GetPurchaseOrdersFilterDto extends SoftDeleteMixin(
  PaginationFilterMixin(DraftModeMixin(GetPurchaseOrdersFilterFields)),
) {}
