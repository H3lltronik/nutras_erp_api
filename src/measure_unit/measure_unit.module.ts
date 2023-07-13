import { Module } from '@nestjs/common';
import { MeasureUnitService } from './measure_unit.service';
import { MeasureUnitController } from './measure_unit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeasureUnit } from './entities/measure_unit.entity';

const repositories = TypeOrmModule.forFeature([MeasureUnit]);

@Module({
  controllers: [MeasureUnitController],
  providers: [MeasureUnitService],
  imports: [repositories],
})
export class MeasureUnitModule {}
