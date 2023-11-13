// profile.dto.ts
import {
  PaginationFilterMixin,
  SoftDeleteMixin,
} from '@/src/common/dto/pagination-base.dto';
import { IsOptional, IsString } from 'class-validator';

export class GetUsersFilterFields {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  profileId?: string;
}

export class GetUsersFilterDto extends SoftDeleteMixin(
  PaginationFilterMixin(GetUsersFilterFields),
) {}
