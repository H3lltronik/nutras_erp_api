import { PartialType } from '@nestjs/mapped-types';
import { CreateLoteDto } from './create-lote-entry-type.dto';

export class UpdateLoteDto extends PartialType(CreateLoteDto) {}
