import { IsNotEmpty } from 'class-validator';

export class CreateLoteDto {
  @IsNotEmpty()
  name: string;
}
