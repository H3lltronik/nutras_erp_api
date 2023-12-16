// profile.dto.ts
import {
  DraftModeMixin,
  PaginationFilterMixin,
  SoftDeleteMixin,
} from '@/src/common/dto/pagination-base.dto';
import { IsOptional, IsString } from 'class-validator';

class GetLotesFilterFields {
  @IsOptional()
  @IsString()
  search?: string;
}

export class GetLotesFilterDto extends SoftDeleteMixin(
  PaginationFilterMixin(DraftModeMixin(GetLotesFilterFields)),
) {}
