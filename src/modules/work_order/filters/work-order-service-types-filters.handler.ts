import { BaseFilterHandler } from '@/src/common/filters/BaseFilterHandler';
import { WorkOrderServiceType } from '../entities/work-order-service-type.entity';
import { WorkOrderServiceTypesDraftModeFilter } from './methods/work-order-service-type-draft-mode.filter';
import { WorkOrderServiceTypesPublishedModeFilter } from './methods/work-order-service-type-published-mode.filter';

export class WorkOrderServiceTypesFiltersHandler extends BaseFilterHandler<WorkOrderServiceType> {
  protected filters = {
    draftMode: new WorkOrderServiceTypesDraftModeFilter(),
    published: new WorkOrderServiceTypesPublishedModeFilter(),
  };
}
