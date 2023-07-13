import { Injectable } from '@nestjs/common';
import { CreateMeasureUnitDto } from './dto/create-measure_unit.dto';
import { UpdateMeasureUnitDto } from './dto/update-measure_unit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MeasureUnit } from './entities/measure_unit.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MeasureUnitService {
  constructor(
    @InjectRepository(MeasureUnit)
    private measureUnitRepository: Repository<MeasureUnit>,
  ) {}

  async create(createMeasureUnitDto: CreateMeasureUnitDto) {
    return await this.measureUnitRepository.save(createMeasureUnitDto);
  }

  findAll() {
    return this.measureUnitRepository.find();
  }

  findOne(id: string) {
    return this.measureUnitRepository.findOne({ where: { id } });
  }

  update(id: string, updateMeasureUnitDto: UpdateMeasureUnitDto) {
    return this.measureUnitRepository.update(id, updateMeasureUnitDto);
  }

  remove(id: number) {
    return this.measureUnitRepository.delete(id);
  }
}
