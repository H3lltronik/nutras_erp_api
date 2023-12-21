import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from '../department/entities/department.entity';
import { InventoryMovement } from '../inventory/entities/inventory_movement.entity';
import { InventoryMovementLote } from '../inventory/entities/inventory_movement_lote.entity';
import { Lote } from '../lote/entities/lote.entity';
import { LoteEntryType } from '../lote/entities/lote_entry_type.entity';
import { MeasureUnit } from '../measure_unit/entities/measure_unit.entity';
import { KosherDetails } from '../product/entities/kosher-details.entity';
import { ProductType } from '../product/entities/product-type.entity';
import { Product } from '../product/entities/product.entity';
import { ProductionData } from '../product/entities/production-product-data.entity';
import { PurchaseData } from '../product/entities/purchase-product-data.entity';
import { Profile } from '../profile/entities/profile.entity';
import { Provider } from '../provider/entities/provider.entity';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';
import { Warehouse } from '../warehouse/entities/warehouse.entity';
import { SeederController } from './seeder.controller';
import { DepartmentSeederService } from './services/department.seeder.service';
import { InventoryMovementSeederService } from './services/inventory_movement.seeder.service';
import { InventoryMovementLoteSeederService } from './services/inventory_movement_lote.seeder.service';
import { KosherDetailsSeederService } from './services/kosher-seeder.service';
import { LoteSeederService } from './services/lote.seeder.service';
import { LoteEntryTypeSeederService } from './services/lote_entry_type.seeder.service';
import { MeasureUnitSeederService } from './services/measure_unit.seeder.service';
import { ProductTypeSeederService } from './services/product-type-seeder.service';
import { ProductSeederService } from './services/product.seeder.service';
import { ProductionDataSeederService } from './services/production-data.seeder.service.';
import { ProfileSeederService } from './services/profile.seeder.service';
import { ProviderSeederService } from './services/provider.seeder.service';
import { PurchaseDataSeederService } from './services/purchase-data.seeder.service';
import { SeederService } from './services/seeder.service';
import { UserSeederService } from './services/user.seeder.service';
import { WarehouseSeederService } from './services/warehouse.seeder.service';
import { MovementTypeSeederService } from './services/movement-type.seeder.service';
import { MovementConceptSeederService } from './services/movement-concept.seeder.service';
import { MovementConcept } from '../inventory/entities/movement_concept.entity';
import { MovementType } from '../inventory/entities/movement_type.entity';

const repositories = TypeOrmModule.forFeature([
  MeasureUnit,
  InventoryMovement,
  InventoryMovementLote,
  Lote,
  LoteEntryType,
  Profile,
  Warehouse,
  Department,
  Provider,
  User,
  ProductType,
  PurchaseData,
  KosherDetails,
  ProductionData,
  Product,
  MovementType,
  MovementConcept,
]);

@Module({
  providers: [
    SeederService,
    DepartmentSeederService,
    InventoryMovementLoteSeederService,
    InventoryMovementSeederService,
    KosherDetailsSeederService,
    LoteEntryTypeSeederService,
    LoteSeederService,
    MeasureUnitSeederService,
    ProductTypeSeederService,
    ProductSeederService,
    ProductionDataSeederService,
    ProfileSeederService,
    ProviderSeederService,
    PurchaseDataSeederService,
    WarehouseSeederService,
    UserSeederService,
    MovementTypeSeederService,
    MovementConceptSeederService,
  ],
  imports: [repositories, UsersModule],
  controllers: [SeederController],
})
export class SeederModule {}
