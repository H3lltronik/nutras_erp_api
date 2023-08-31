import { BaseFilterHandler } from '@/src/common/filters/BaseFilterHandler';
import { Department } from '../entities/department.entity';

export class DepartmentFiltersHandler extends BaseFilterHandler<Department> {
  protected filters = {};
}
