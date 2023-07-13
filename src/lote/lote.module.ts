import { Module } from '@nestjs/common';
import { LoteService } from './lote.service';
import { LoteController } from './lote.controller';
import { Lote } from './entities/lote.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

const repositories = TypeOrmModule.forFeature([Lote]);

@Module({
  controllers: [LoteController],
  providers: [LoteService],
  imports: [repositories],
})
export class LoteModule {}
