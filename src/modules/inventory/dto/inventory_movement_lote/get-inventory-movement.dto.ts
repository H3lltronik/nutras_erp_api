// profile.dto.ts
import {
  DraftModeMixin,
  PaginationFilterMixin,
  SoftDeleteMixin,
} from '@/src/common/dto/pagination-base.dto';

class GetInventoryMovementDto {}

export class GetInventoryMovementFilterDto extends SoftDeleteMixin(
  PaginationFilterMixin(DraftModeMixin(GetInventoryMovementDto)),
) {}
