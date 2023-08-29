// profile.dto.ts
import { IsOptional } from 'class-validator';

export class GetMeasureUnitFilterDto {
  @IsOptional()
  limit?: number;

  @IsOptional()
  offset?: number;
}
