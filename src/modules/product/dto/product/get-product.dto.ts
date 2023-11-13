// profile.dto.ts
import {
  DraftModeMixin,
  PaginationFilterMixin,
  SoftDeleteMixin,
} from '@/src/common/dto/pagination-base.dto';
import { IsOptional, IsString } from 'class-validator';

class GetProductsFilterFields {
  @IsOptional()
  @IsString()
  search?: string;
}

export class GetProductsFilterDto extends SoftDeleteMixin(
  PaginationFilterMixin(DraftModeMixin(GetProductsFilterFields)),
) {}
