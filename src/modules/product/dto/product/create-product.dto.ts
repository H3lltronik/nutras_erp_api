import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  unit: string;
}
