import { IsNotEmpty } from 'class-validator';

export class CreateInventoryMovementDto {
  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  ot_id: string;

  @IsNotEmpty()
  reason: string;

  @IsNotEmpty()
  from: string;

  @IsNotEmpty()
  to: string;
}
