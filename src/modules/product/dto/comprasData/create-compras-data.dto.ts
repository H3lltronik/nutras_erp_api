import { IsNotEmpty } from 'class-validator';

export class CreatePurchaseDataDto {
  @IsNotEmpty()
  allergen: string;
}
