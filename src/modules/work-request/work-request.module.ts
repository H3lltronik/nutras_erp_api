import { Module } from '@nestjs/common';
import { LoteService } from './services/work-request.service';
import { LoteController } from './controllers/work-request.controller';
import { Lote } from './entities/work-request.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoteEntryType } from './entities/work-request_entry_type.entity';
import { LoteEntryTypeController } from './controllers/work-request-entry-type.controller';
import { LoteEntryTypeService } from './services/work-request-entry-type.service';

const repositories = TypeOrmModule.forFeature([Lote, LoteEntryType]);

@Module({
  controllers: [LoteController, LoteEntryTypeController],
  providers: [LoteService, LoteEntryTypeService],
  imports: [repositories],
  exports: [LoteService, LoteEntryTypeService],
})
export class LoteModule {}
