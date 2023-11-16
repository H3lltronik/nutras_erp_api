import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProviderController } from './controllers/provider.controller';
import { Provider } from './entities/provider.entity';
import { ProviderService } from './services/provider.service';

const repositories = TypeOrmModule.forFeature([Provider]);

@Module({
  controllers: [ProviderController],
  providers: [ProviderService],
  imports: [repositories],
})
export class ProviderModule {}
