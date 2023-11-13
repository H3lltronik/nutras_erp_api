// profile.dto.ts
import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, Min } from 'class-validator';

export function PaginationFilterMixin<
  T extends { new (...args: any[]): object },
>(Base: T) {
  class PaginationFilter extends Base {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(0)
    limit?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(0)
    offset?: number;
  }
  return PaginationFilter;
}

export function SoftDeleteMixin<T extends { new (...args: any[]): object }>(
  Base: T,
) {
  class SoftDelete extends Base {
    @IsOptional()
    @IsString()
    @IsIn(['true', 'false'])
    withDeleted?: string;
  }
  return SoftDelete;
}

export function DraftModeMixin<T extends { new (...args: any[]): object }>(
  Base: T,
) {
  class SoftDelete extends Base {
    @IsOptional()
    @IsString()
    @IsIn(['true', 'false'])
    draftMode?: string;
  }
  return SoftDelete;
}
