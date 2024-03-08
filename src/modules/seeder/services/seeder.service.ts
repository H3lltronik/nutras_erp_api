import { Injectable } from '@nestjs/common';
import { Department } from '../../department/entities/department.entity';
import { Lote } from '../../lote/entities/lote.entity';
import { MeasureUnit } from '../../measure_unit/entities/measure_unit.entity';
import { KosherDetails } from '../../product/entities/kosher-details.entity';
import { Product } from '../../product/entities/product.entity';
import { ProductionData } from '../../product/entities/production-product-data.entity';
import { PurchaseData } from '../../product/entities/purchase-product-data.entity';
import { Profile } from '../../profile/entities/profile.entity';
import { Provider } from '../../provider/entities/provider.entity';
import { DepartmentSeederService } from './department.seeder.service';
import { InventoryMovementSeederService } from './inventory_movement.seeder.service';
import { InventoryMovementLoteSeederService } from './inventory_movement_lote.seeder.service';
import { KosherDetailsSeederService } from './kosher-seeder.service';
import { LoteSeederService } from './lote.seeder.service';
import { LoteEntryTypeSeederService } from './lote_entry_type.seeder.service';
import { MeasureUnitSeederService } from './measure_unit.seeder.service';
import { MovementConceptSeederService } from './movement-concept.seeder.service';
import { MovementTypeSeederService } from './movement-type.seeder.service';
import { ProductTypeSeederService } from './product-type-seeder.service';
import { ProductSeederService } from './product.seeder.service';
import { ProductionDataSeederService } from './production-data.seeder.service.';
import { ProfileSeederService } from './profile.seeder.service';
import { ProviderSeederService } from './provider.seeder.service';
import { PurchaseDataSeederService } from './purchase-data.seeder.service';
import { UserSeederService } from './user.seeder.service';
import { WarehouseSeederService } from './warehouse.seeder.service';
import { ProductPresentationSeederService } from './product-presentation.seeder.service';

@Injectable()
export class SeederService {
  constructor(
    private departmentSeederService: DepartmentSeederService,
    private inventoryMovementLoteSeederService: InventoryMovementLoteSeederService,
    private inventoryMovementSeederService: InventoryMovementSeederService,
    private kosherDetailsSeederService: KosherDetailsSeederService,
    private loteEntryTypeSeederService: LoteEntryTypeSeederService,
    private loteSeederService: LoteSeederService,
    private measurementUnitSeederService: MeasureUnitSeederService,
    private productTypeSeederService: ProductTypeSeederService,
    private productPresentationSeederService: ProductPresentationSeederService,
    private productSeederService: ProductSeederService,
    private productionDataSeederService: ProductionDataSeederService,
    private profileSeederService: ProfileSeederService,
    private providerSeederService: ProviderSeederService,
    private purchaseDataSeederService: PurchaseDataSeederService,
    private warehouseSeederService: WarehouseSeederService,
    private usersSeederService: UserSeederService,
    private movementTypeSeederService: MovementTypeSeederService,
    private movementConceptSeederService: MovementConceptSeederService,
  ) {}

  async seed() {
    // DEPARTMENTS
    const directionDepartmentId = '65a427ba-d703-4f8f-b688-ccfa44d62db4';
    const productionDepartmentId = '6cebdab4-cc4b-4bee-b011-286c0ce6979b';
    const purchasesDepartmentId = '65a427ba-d703-4f8f-b688-ccfa44d62db0';
    const qualityDepartmentId = '65a427ba-d703-4f8f-b688-ccfa44d62db1';
    const warehouseDepartmentId = '65a427ba-d703-4f8f-b688-ccfa44d62db2';
    const salesDepartmentId = '65a427ba-d703-4f8f-b688-ccfa44d62db3';

    // PROFILES
    const adminProfileId = '65a427ba-d703-4f8f-b688-ccfa44d62db5';

    // PRODUCT TYPES
    const productTypePTId = '2ad66400-dbcd-41f0-bb7c-69a8bc674af0';
    const productTypePPId = '95db0130-1e4a-4a96-adb5-ad11a6bdf7cb';

    // WAREHOUSE
    const generalWarehouseId = '621b95b5-6320-4e62-8b9d-4bc068867ee6';
    const productionWarehouseId = '5606d5cd-e764-4478-bd2e-639cfb0a90b9';
    const entryWarehouseId = 'afd61497-563d-47c2-aada-b988aea13c97';
    const exitWarehouseId = '6800d31f-c9fd-490c-8c02-3d6c0be5bc14';

    // LOTE ENTRY TYPES
    const naturalLoteEntryTypeId = '6cebdab4-cc4b-4bee-b011-286c0ce6979a';
    const divisionLoteEntryTypeId = '65a427ba-d703-4f8f-b688-ccfa44d62dba';

    // Movement Types

    const loaders1 = await Promise.allSettled([
      this.profileSeederService.seed({
        adminProfileId,
      }),
      // this.providerSeederService.seed(),
      this.departmentSeederService.seed({
        directionDepartmentId,
        productionDepartmentId,
        purchasesDepartmentId,
        qualityDepartmentId,
        warehouseDepartmentId,
        salesDepartmentId,
      }),
      this.measurementUnitSeederService.seed(),
    ]).then((results) =>
      results.map((result) =>
        result.status === 'fulfilled' ? result.value : [],
      ),
    );

    const [profiles, providers, departments, measureUnits] = loaders1 as [
      Profile[],
      Provider[],
      Department[],
      MeasureUnit[],
    ];

    const productTypes = await this.productTypeSeederService.seed({
      productionDepartmentId,
      purchasesDepartmentId,
      productTypePTId,
      productTypePPId,
    });

    try {
      const users = await this.usersSeederService.seed({
        adminProfileId,
        directionDepartmentId,
      });
    } catch (error) {
      console.error('Error seeding users', error);
    }
    const products: Product[] = [];

    // execute only if is not production
    if (process.env.NODE_ENV !== 'production' && false) {
      for (let i = 0; i < 10; i++) {
        const loaders2 = await Promise.allSettled([
          this.kosherDetailsSeederService.seed(),
          this.productionDataSeederService.seed(),
          this.purchaseDataSeederService.seed(),
        ]).then((results) =>
          results.map((result) =>
            result.status === 'fulfilled' ? result.value : [],
          ),
        );
  
        const [kosherDetails, productionData, purchaseData] = loaders2 as [
          KosherDetails,
          ProductionData,
          PurchaseData,
        ];
  
        const product = await this.productSeederService.seed({
          kosherDetailsId: kosherDetails.id,
          productionDataId: productionData.id,
          purchaseDataId: purchaseData.id,
          providerIds: providers.map((provider) => provider.id),
          unitIds: measureUnits.map((measureUnit) => measureUnit.id),
          productTypeIds: productTypes.map((productType) => productType.id),
          deparmentIds: departments.map((department) => department.id),
        });
  
        if (product) products.push(product);
      }
    }

    await this.warehouseSeederService.seed({
      generalWarehouseId,
      productionWarehouseId,
      entryWarehouseId,
      exitWarehouseId,
    });
    await this.loteEntryTypeSeederService.seed({
      naturalLoteEntryTypeId,
      divisionLoteEntryTypeId,
    });

    if (!!products && products.length) {
      const lotesPromises: Promise<Lote>[] = [];
      for (let j = 0; j < 20; j++) {
        lotesPromises.push(
          this.loteSeederService.seed({
            naturalLoteEntryTypeId,
            divisionLoteEntryTypeId,
            productIds: products.map((product) => product.id),
            warehouseId: generalWarehouseId,
          }),
        );
      }
      const lotes: Lote[] = await Promise.all(lotesPromises);

      const inventoryMovements = await this.inventoryMovementSeederService.seed(
        {
          entryWarehouseId,
          exitWarehouseId,
          productionWarehouseId,
          generalWarehouseId,
        },
      );
      await this.inventoryMovementLoteSeederService.seed({
        loteIds: lotes.map((lote) => lote.id),
        inventoryMovementIds: inventoryMovements.map(
          (inventoryMovement) => inventoryMovement.id,
        ),
      });
    }

    await this.movementTypeSeederService.seed();
    await this.movementConceptSeederService.seed();
    await this.productPresentationSeederService.seed();

    // Fixes of data in database
    console.log('Fixing products...');
    this.productSeederService.fix();

    return 'ok';
  }
}
