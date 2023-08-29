// profile.dto.ts
import { IsOptional, IsString } from 'class-validator';

export class GetProductsFilterDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  limit?: number;

  @IsOptional()
  offset?: number;
}
