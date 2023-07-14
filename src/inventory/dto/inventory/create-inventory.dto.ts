import { IsNotEmpty } from 'class-validator';

export class CreateInventoryDto {
  @IsNotEmpty()
  lote: string;

  @IsNotEmpty()
  warehouse: string;

  @IsNotEmpty()
  quantity: string;
}
