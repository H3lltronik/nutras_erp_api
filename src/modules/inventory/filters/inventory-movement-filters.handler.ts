import { BaseFilterHandler } from '@/src/common/filters/BaseFilterHandler';
import { InventoryMovement } from '../entities/inventory_movement.entity';
import { InventoryMovementDraftModeFilter } from './methods/inventory-movement-draft-mode.filter';
import { InventoryMovementPublishedModeFilter } from './methods/inventory-movement-published-mode.filter';

export class InventoryMovementFiltersHandler extends BaseFilterHandler<InventoryMovement> {
  protected filters = {
    draftMode: new InventoryMovementDraftModeFilter(),
    published: new InventoryMovementPublishedModeFilter(),
  };
}
