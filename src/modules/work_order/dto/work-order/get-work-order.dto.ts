// profile.dto.ts
import {
  DraftModeMixin,
  PaginationFilterMixin,
  SoftDeleteMixin,
} from '@/src/common/dto/pagination-base.dto';
import { IsOptional, IsString } from 'class-validator';

class GetWorkOrdersFilterFields {
  @IsOptional()
  @IsString()
  search?: string;
}

export class GetWorkOrdersFilterDto extends SoftDeleteMixin(
  PaginationFilterMixin(DraftModeMixin(GetWorkOrdersFilterFields)),
) {}
