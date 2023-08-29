// profile.dto.ts
import { IsOptional, IsString } from 'class-validator';

export class GetUsersFilterDto {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  profileId?: string;

  @IsOptional()
  limit?: number;

  @IsOptional()
  offset?: number;
}
