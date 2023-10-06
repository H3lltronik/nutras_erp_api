import { PartialType } from '@nestjs/mapped-types';
import { CreatePurchaseDataDto } from './create-compras-data.dto';

export class UpdatePurchaseDataDto extends PartialType(CreatePurchaseDataDto) {}
