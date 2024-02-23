import { IsBoolean, IsNotEmpty, IsOptional, ValidateIf } from 'class-validator';

export class CreateProviderDto {
  @IsOptional()
  @IsBoolean()
  isDraft?: boolean;

  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;

  @ValidateIf((o) => !o.isDraft)
  @IsOptional()
  name: string;

  @ValidateIf((o) => !o.isDraft)
  @IsOptional()
  businessName: string;

  @ValidateIf((o) => !o.isDraft)
  @IsOptional()
  service: string;

  @ValidateIf((o) => !o.isDraft)
  @IsOptional()
  lada: string;

  @ValidateIf((o) => !o.isDraft)
  @IsOptional()
  phone: string;

  @ValidateIf((o) => !o.isDraft)
  @IsOptional()
  email: string;

  @ValidateIf((o) => !o.isDraft)
  @IsOptional()
  paymentEmail: string;

  @ValidateIf((o) => !o.isDraft)
  @IsOptional()
  bank: string;

  @ValidateIf((o) => !o.isDraft)
  @IsOptional()
  clabeAccount: string;

  @ValidateIf((o) => !o.isDraft)
  @IsOptional()
  accountNumber: string;
}
