import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateInventoryMovementLoteDto {
  @IsNotEmpty()
  loteId: string;

  @IsNotEmpty()
  inventoryMovementId: string;

  @IsNotEmpty()
  folio: string;

  @IsNotEmpty()
  @Min(1)
  @IsNumber()
  quantity: number;
}
