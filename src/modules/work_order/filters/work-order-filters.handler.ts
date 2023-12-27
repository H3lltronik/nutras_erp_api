import { BaseFilterHandler } from '@/src/common/filters/BaseFilterHandler';
import { WorkOrder } from '../entities/work-order.entity';
import { WorkOrderDraftModeFilter } from './methods/work-order-draft-mode.filter';
import { WorkOrderPublishedModeFilter } from './methods/work-order-published-mode.filter';

export class WorkOrdersFiltersHandler extends BaseFilterHandler<WorkOrder> {
  protected filters = {
    draftMode: new WorkOrderDraftModeFilter(),
    published: new WorkOrderPublishedModeFilter(),
  };
}
