import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { CreatePurchaseDataDto } from '../comprasData/create-compras-data.dto';
import { CreateKosherDetailsDto } from '../kosherDetails/create-kosher-data.dto';
import { CreateProductionDataDto } from '../productionData/create-production-data.dto';

export class CreateProductDto {
  @IsOptional()
  @IsBoolean()
  isDraft?: boolean;

  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;

  @ValidateIf((o) => !o.isDraft)
  @IsNotEmpty()
  profileId: string;

  @ValidateIf((o) => !o.isDraft)
  @IsNotEmpty()
  code: string;

  @ValidateIf((o) => !o.isDraft)
  @IsNotEmpty()
  productTypeId: string;

  @ValidateIf(
    (o) => !o.isDraft && o.productTypeId === process.env.PRODUCT_TYPE_PP_ID,
  )
  @IsNotEmpty()
  productTypeCategoryId: string;

  @ValidateIf((o) => !o.isDraft)
  @IsNotEmpty()
  commonName: string;

  @ValidateIf(
    (o) => !o.isDraft && o.departmentId === process.env.PURCHASES_DEPARTMENT_ID,
  )
  @IsNotEmpty()
  providerId: string;

  @ValidateIf((o) => !o.isDraft)
  @IsNotEmpty()
  unitId: string;

  @ValidateIf(
    (o) => !o.isDraft && o.departmentId === process.env.PURCHASES_DEPARTMENT_ID,
  )
  @IsNotEmpty()
  isKosher: boolean;

  @ValidateIf((o) => !o.isDraft)
  @IsNotEmpty()
  presentation: string;

  @ValidateIf(
    (o) => !o.isDraft && o.departmentId === process.env.PURCHASES_DEPARTMENT_ID,
  )
  @ValidateNested()
  @Type(() => CreatePurchaseDataDto)
  purchaseData: CreatePurchaseDataDto;

  @ValidateIf(
    (o) =>
      !o.isDraft && o.departmentId === process.env.PRODUCTION_DEPARTMENT_ID,
  )
  @ValidateNested()
  @Type(() => CreateProductionDataDto)
  productionData: CreateProductionDataDto;

  @ValidateIf((o) => !o.isDraft && o.isKosher)
  @ValidateNested()
  @Type(() => CreateKosherDetailsDto)
  kosherDetails: CreateKosherDetailsDto;

  @ValidateIf((o) => !o.isDraft)
  @IsNotEmpty()
  departmentId: string;
}
