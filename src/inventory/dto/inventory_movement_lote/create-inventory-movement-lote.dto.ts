import { IsNotEmpty, Min } from 'class-validator';

export class CreateInventoryDto {
  @IsNotEmpty()
  lote: string;

  @IsNotEmpty()
  warehouse: string;

  @IsNotEmpty()
  @Min(0)
  quantity: string;
}
