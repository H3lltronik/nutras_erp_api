import { PartialType } from '@nestjs/mapped-types';
import { CreateLoteDto } from './create-work-request-entry-type.dto';

export class UpdateLoteDto extends PartialType(CreateLoteDto) {}
