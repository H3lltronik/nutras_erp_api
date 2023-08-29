import {
  IsAlpha,
  IsAlphanumeric,
  IsNotEmpty,
  Length,
  Max,
} from 'class-validator';

export class CreateDepartmentDto {
  @IsNotEmpty()
  @IsAlphanumeric()
  name: string;
}
