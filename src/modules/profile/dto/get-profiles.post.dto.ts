// profile.dto.ts
import { IsOptional, IsString } from 'class-validator';

export class GetProfilesFilterDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  limit?: number;

  @IsOptional()
  offset?: number;
}
