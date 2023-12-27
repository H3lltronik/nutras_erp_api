import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkRequestDto } from './create-work-request.dto';

export class UpdateWorkRequestDto extends PartialType(CreateWorkRequestDto) {}
