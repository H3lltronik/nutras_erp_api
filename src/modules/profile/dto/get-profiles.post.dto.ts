// profile.dto.ts
import {
  PaginationFilterMixin,
  SoftDeleteMixin,
} from '@/src/common/dto/pagination-base.dto';
import { IsOptional, IsString } from 'class-validator';

class GetProfilesFilterFields {
  @IsOptional()
  @IsString()
  name?: string;
}

export class GetProfilesFilterDto extends SoftDeleteMixin(
  PaginationFilterMixin(GetProfilesFilterFields),
) {}
