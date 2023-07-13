import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileModule } from './profile/profile.module';

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
  imports: [AuthModule, UsersModule, typeOrm, ProfileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
