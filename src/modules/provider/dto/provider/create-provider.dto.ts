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
  businessName: string;

  @ValidateIf((o) => !o.isDraft)
  @IsNotEmpty()
  service: string;

  @ValidateIf((o) => !o.isDraft)
  @IsNotEmpty()
  lada: string;

  @ValidateIf((o) => !o.isDraft)
  @IsNotEmpty()
  phone: string;

  @ValidateIf((o) => !o.isDraft)
  @IsNotEmpty()
  email: string;

  @ValidateIf((o) => !o.isDraft)
  @IsNotEmpty()
  paymentEmail: string;

  @ValidateIf((o) => !o.isDraft)
  @IsNotEmpty()
  bank: string;

  @ValidateIf((o) => !o.isDraft)
  @IsNotEmpty()
  clabeAccount: string;

  @ValidateIf((o) => !o.isDraft)
  @IsNotEmpty()
  accountNumber: string;
}
