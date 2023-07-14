import { IsNotEmpty } from 'class-validator';

export class CreateInventoryDto {
  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  quantity: string;

  @IsNotEmpty()
  ot_id: string;

  @IsNotEmpty()
  reason: string;

  @IsNotEmpty()
  from: string;

  @IsNotEmpty()
  to: string;
}
