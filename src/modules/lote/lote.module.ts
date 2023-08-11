import { Module } from '@nestjs/common';
import { LoteService } from './services/lote.service';
import { LoteController } from './controllers/lote.controller';
import { Lote } from './entities/lote.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoteEntryType } from './entities/lote_entry_type.entity';
import { LoteEntryTypeController } from './controllers/lote-entry-type.controller';
import { LoteEntryTypeService } from './services/lote-entry-type.service';

const repositories = TypeOrmModule.forFeature([Lote, LoteEntryType]);

@Module({
  controllers: [LoteController, LoteEntryTypeController],
  providers: [LoteService, LoteEntryTypeService],
  imports: [repositories],
})
export class LoteModule {}
