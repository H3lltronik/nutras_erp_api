import { PartialType } from '@nestjs/mapped-types';
import {
  IsString,
  ArrayNotEmpty,
  IsOptional,
  IsArray,
  IsNotEmpty,
} from 'class-validator';
import { CreateUserDto } from './create.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
