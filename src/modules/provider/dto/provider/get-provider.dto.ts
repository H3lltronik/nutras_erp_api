// profile.dto.ts
import { IsIn, IsOptional, IsString } from 'class-validator';

export class GetProvidersFilterDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  @IsIn(['true', 'false'])
  draftMode?: string;

  @IsOptional()
  limit?: number;

  @IsOptional()
  offset?: number;
}
