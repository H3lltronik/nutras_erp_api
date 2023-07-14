import { PartialType } from '@nestjs/mapped-types';
import { CreateInventoryMovementLoteDto } from './create-inventory-movement-lote.dto';

export class UpdateInventoryMovementLoteDto extends PartialType(
  CreateInventoryMovementLoteDto,
) {}
