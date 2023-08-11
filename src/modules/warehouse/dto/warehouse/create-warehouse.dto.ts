import { IsNotEmpty } from 'class-validator';

export class CreateWarehouseDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  address: string;
}
