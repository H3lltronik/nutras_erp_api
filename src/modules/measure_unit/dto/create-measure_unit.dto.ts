import {
  IsAlpha,
  IsAlphanumeric,
  IsNotEmpty,
  Length,
  Max,
} from 'class-validator';

export class CreateMeasureUnitDto {
  @IsNotEmpty()
  @IsAlphanumeric()
  name: string;
}
