import { SelectQueryBuilder } from 'typeorm';
import { Filter } from '../../../types';
import { WorkOrder } from '../../entities/work-order.entity';

export class WorkOrderPublishedModeFilter implements Filter<WorkOrder> {
  apply(
    query: SelectQueryBuilder<WorkOrder>,
    value: string,
  ): SelectQueryBuilder<WorkOrder> {
    return query.andWhere('workOrder.isPublished = :isDraft', {
      isDraft: value,
    });
  }
}
