import { SelectQueryBuilder } from 'typeorm';
import { Filter } from '../../../types';
import { PurchaseRequisition } from '../../entities/purchase_requisition.entity';

export class PurchaseRequisitionPublishedModeFilter
  implements Filter<PurchaseRequisition>
{
  apply(
    query: SelectQueryBuilder<PurchaseRequisition>,
    value: string,
  ): SelectQueryBuilder<PurchaseRequisition> {
    return query.andWhere('purchaseRequisition.isPublished = :isDraft', {
      isDraft: value,
    });
  }
}
