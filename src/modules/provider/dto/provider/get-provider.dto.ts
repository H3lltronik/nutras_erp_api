// profile.dto.ts
import {
  DraftModeMixin,
  PaginationFilterMixin,
  SoftDeleteMixin,
} from '@/src/common/dto/pagination-base.dto';
import { IsOptional, IsString } from 'class-validator';

class GetProvidersFilterFields {
  @IsOptional()
  @IsString()
  search?: string;
}

export class GetProvidersFilterDto extends SoftDeleteMixin(
  PaginationFilterMixin(DraftModeMixin(GetProvidersFilterFields)),
) {}
