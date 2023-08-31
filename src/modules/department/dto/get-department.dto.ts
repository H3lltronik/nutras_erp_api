// profile.dto.ts
import { IsOptional } from 'class-validator';

export class GetDepartmentsFilterDto {
  @IsOptional()
  limit?: number;

  @IsOptional()
  offset?: number;
}
