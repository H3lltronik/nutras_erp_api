import { IsNotEmpty, Min } from 'class-validator';

export class CreateInventoryMovementLoteDto {
  @IsNotEmpty()
  lote: string;

  @IsNotEmpty()
  folio: string;

  @IsNotEmpty()
  inventory_movement: string;
}
