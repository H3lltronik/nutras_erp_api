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

  @ValidateIf((o) => !o.isDraft)
  @IsNotEmpty()
  commonName: string;

  @ValidateIf((o) => !o.isDraft)
  @IsNotEmpty()
  providerId: string;

  @ValidateIf((o) => !o.isDraft)
  @IsNotEmpty()
  unitId: string;

  @ValidateIf((o) => !o.isDraft)
  @IsNotEmpty()
  isKosher: boolean;

  @ValidateIf((o) => !o.isDraft)
  @IsNotEmpty()
  presentation: string;

  @ValidateIf(
    (o) => !o.isDraft && o.profileId === 'Compras department profile ID',
  )
  @ValidateNested()
  @Type(() => CreatePurchaseDataDto)
  purchaseData: CreatePurchaseDataDto;

  @ValidateIf(
    (o) => !o.isDraft && o.profileId === 'Produccion department profile ID',
  )
  @ValidateNested()
  @Type(() => CreateProductionDataDto)
  productionData: CreateProductionDataDto;

  @ValidateIf((o) => !o.isDraft && o.isKosher)
  @ValidateNested()
  @Type(() => CreateKosherDetailsDto)
  kosherDetails: CreateKosherDetailsDto;
}
