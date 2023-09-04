import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';

export class CreateProductDto {
  @IsOptional()
  @IsBoolean()
  isDraft?: boolean;

  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;

  @ValidateIf((o) => !o.isDraft)
  @IsNotEmpty()
  code: string;

  @ValidateIf((o) => !o.isDraft)
  @IsNotEmpty()
  unitId: string;

  @ValidateIf((o) => !o.isDraft)
  @IsNotEmpty()
  commonName: string;

  @ValidateIf((o) => !o.isDraft)
  @IsString()
  vendorDescription: string;

  @ValidateIf((o) => !o.isDraft)
  @IsString()
  provider: string;

  @ValidateIf((o) => !o.isDraft)
  @IsString()
  codeAlt: string;

  @ValidateIf((o) => !o.isDraft)
  @IsString()
  presentation: string;

  @ValidateIf((o) => !o.isDraft)
  @IsNumber()
  quantity: number;

  @ValidateIf((o) => !o.isDraft)
  @IsString()
  allergen: string;

  @ValidateIf((o) => !o.isDraft)
  @IsString()
  status: string;

  @ValidateIf((o) => !o.isDraft)
  @IsString()
  kosherAgency: string;

  @ValidateIf((o) => !o.isDraft)
  @IsString()
  companyIngredientName: string;

  @ValidateIf((o) => !o.isDraft)
  @IsString()
  certificateName: string;

  @ValidateIf((o) => !o.isDraft)
  @IsString()
  vendor: string;

  @ValidateIf((o) => !o.isDraft)
  @IsString()
  note: string;
}
