import { SelectQueryBuilder } from 'typeorm';
import { Filter } from '../../../types';
import { InventoryMovement } from '../../entities/inventory_movement.entity';

export class InventoryMovementPublishedModeFilter
  implements Filter<InventoryMovement>
{
  apply(
    query: SelectQueryBuilder<InventoryMovement>,
    value: string,
  ): SelectQueryBuilder<InventoryMovement> {
    return query.andWhere('inventoryMovement.isPublished = :isDraft', {
      isDraft: value,
    });
  }
}
