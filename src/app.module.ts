import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { HealthCheckController } from './modules/health-check/health-check.controller';
import { InventoryModule } from './modules/inventory/inventory.module';
import { LoteModule } from './modules/lote/lote.module';
import { MeasureUnitModule } from './modules/measure_unit/measure_unit.module';
import { ProductModule } from './modules/product/product.module';
import { ProfileModule } from './modules/profile/profile.module';
import { UsersModule } from './modules/users/users.module';
import { WarehouseModule } from './modules/warehouse/warehouse.module';

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
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [HealthCheckController],
  providers: [],
})
export class AppModule {}
