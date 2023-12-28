// profile.dto.ts
import {
  DraftModeMixin,
  PaginationFilterMixin,
  SoftDeleteMixin,
} from '@/src/common/dto/pagination-base.dto';
import { IsOptional, IsString } from 'class-validator';

class GetWorkOrderServiceTypesFields {
  @IsOptional()
  @IsString()
  search?: string;
}

export class GetWorkOrderServiceTypesDto extends SoftDeleteMixin(
  PaginationFilterMixin(DraftModeMixin(GetWorkOrderServiceTypesFields)),
) {}
