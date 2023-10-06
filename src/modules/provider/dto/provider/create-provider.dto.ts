import { IsBoolean, IsNotEmpty, IsOptional, ValidateIf } from 'class-validator';

export class CreateProviderDto {
  @IsOptional()
  @IsBoolean()
  isDraft?: boolean;

  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;

  @ValidateIf((o) => !o.isDraft)
  @IsNotEmpty()
  name: string;

  @ValidateIf((o) => !o.isDraft)
  @IsNotEmpty()
  description: string;
}
