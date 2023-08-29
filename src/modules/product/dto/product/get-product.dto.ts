// profile.dto.ts
import { IsOptional } from 'class-validator';

export class GetProductsFilterDto {
  @IsOptional()
  limit?: number;

  @IsOptional()
  offset?: number;
}
