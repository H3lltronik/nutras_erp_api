import { BaseFilterHandler } from '@/src/common/filters/BaseFilterHandler';
import { PurchaseRequisition } from '../entities/purchase_requisition.entity';
import { PurchaseRequisitionDraftModeFilter } from './methods/purchase_requisition-draft-mode.filter';
import { PurchaseRequisitionPublishedModeFilter } from './methods/purchase_requisition-published-mode.filter';

export class PurchaseRequisitionsFiltersHandler extends BaseFilterHandler<PurchaseRequisition> {
  protected filters = {
    draftMode: new PurchaseRequisitionDraftModeFilter(),
    published: new PurchaseRequisitionPublishedModeFilter(),
  };
}
