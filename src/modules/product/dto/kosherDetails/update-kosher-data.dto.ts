import { PartialType } from '@nestjs/mapped-types';
import { CreateKosherDetailsDto } from './create-kosher-data.dto';

export class UpdateKosherDetailsDto extends PartialType(
  CreateKosherDetailsDto,
) {}
