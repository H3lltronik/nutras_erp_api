import { PartialType } from '@nestjs/mapped-types';
import { CreateMeasureUnitDto } from './create-measure_unit.dto';

export class UpdateMeasureUnitDto extends PartialType(CreateMeasureUnitDto) {
  id: string;
}
