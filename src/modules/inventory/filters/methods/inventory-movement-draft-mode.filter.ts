import { SelectQueryBuilder } from 'typeorm';
import { Filter } from '../../../types';
import { InventoryMovement } from '../../entities/inventory_movement.entity';

export class InventoryMovementDraftModeFilter
  implements Filter<InventoryMovement>
{
  apply(
    query: SelectQueryBuilder<InventoryMovement>,
    value: string,
  ): SelectQueryBuilder<InventoryMovement> {
    return query.andWhere('inventoryMovement.isDraft = :isDraft', {
      isDraft: value,
    });
  }
}
