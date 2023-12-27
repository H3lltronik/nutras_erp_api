// profile.dto.ts
import {
  DraftModeMixin,
  PaginationFilterMixin,
  SoftDeleteMixin,
} from '@/src/common/dto/pagination-base.dto';
import { IsOptional, IsString } from 'class-validator';

class GetWorkRequestsFilterFields {
  @IsOptional()
  @IsString()
  search?: string;
}

export class GetWorkRequestsFilterDto extends SoftDeleteMixin(
  PaginationFilterMixin(DraftModeMixin(GetWorkRequestsFilterFields)),
) {}
