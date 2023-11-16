import { PartialType } from '@nestjs/mapped-types';
import { CreateProductionDataDto } from './create-production-data.dto';

export class UpdateProductionDataDto extends PartialType(
  CreateProductionDataDto,
) {}
