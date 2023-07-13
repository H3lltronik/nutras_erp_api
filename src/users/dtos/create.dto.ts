import {
  IsString,
  ArrayNotEmpty,
  IsOptional,
  IsArray,
  IsNotEmpty,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  profileId: string;
}
