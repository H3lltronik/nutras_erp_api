import { IsNotEmpty } from 'class-validator';

export class CreateProductionDataDto {
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  packaging: string;

  @IsNotEmpty()
  mold: string;

  @IsNotEmpty()
  ptPresentation: string;
}
