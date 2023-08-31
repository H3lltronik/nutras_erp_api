import { BaseFilterHandler } from '@/src/common/filters/BaseFilterHandler';
import { MeasureUnit } from '../entities/measure_unit.entity';

export class MeasureUnitsFiltersHandler extends BaseFilterHandler<MeasureUnit> {
  protected filters = {};
}
