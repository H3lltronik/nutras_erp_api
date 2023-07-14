import { PartialType } from '@nestjs/mapped-types';
import { CreateInventoryDto } from './create-inventory-movement.dto';

export class UpdateInventoryDto extends PartialType(CreateInventoryDto) {}
