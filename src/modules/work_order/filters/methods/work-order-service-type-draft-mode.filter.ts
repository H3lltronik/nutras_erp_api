import { SelectQueryBuilder } from 'typeorm';
import { Filter } from '../../../types';
import { WorkOrderServiceType } from '../../entities/work-order-service-type.entity';

export class WorkOrderServiceTypesDraftModeFilter
  implements Filter<WorkOrderServiceType>
{
  apply(
    query: SelectQueryBuilder<WorkOrderServiceType>,
    value: string,
  ): SelectQueryBuilder<WorkOrderServiceType> {
    return query.andWhere('workOrder.isDraft = :isDraft', {
      isDraft: value,
    });
  }
}
