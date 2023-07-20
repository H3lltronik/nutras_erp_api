import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileModule } from './profile/profile.module';
import { ProductModule } from './product/product.module';
import { LoteModule } from './lote/lote.module';
import { InventoryModule } from './inventory/inventory.module';
import { WarehouseModule } from './warehouse/warehouse.module';
import { MeasureUnitModule } from './measure_unit/measure_unit.module';
import { HealthCheckController } from './health-check/health-check.controller';

const typeOrm = TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'database', // coming from docker-compose.yml
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
  autoLoadEntities: true,
});
@Module({
  imports: [
    AuthModule,
    UsersModule,
    typeOrm,
    ProfileModule,
    ProductModule,
    LoteModule,
    InventoryModule,
    WarehouseModule,
    MeasureUnitModule,
  ],
  controllers: [HealthCheckController],
  providers: [],
})
export class AppModule {}
