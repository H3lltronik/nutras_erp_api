import { HttpException, Injectable } from '@nestjs/common';
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
    return this.measureUnitRepository.find({ withDeleted: false });
  }

  async findOne(id: string) {
    const measureUnit = await this.measureUnitRepository.findOne({
      where: { id },
      withDeleted: false,
    });

    if (!measureUnit) {
      throw new HttpException('Measure unit not found', 404);
    }

    return measureUnit;
  }

  async update(id: string, updateMeasureUnitDto: UpdateMeasureUnitDto) {
    await this.measureUnitRepository.update(id, updateMeasureUnitDto);

    const measureUnit = await this.measureUnitRepository.findOne({
      where: { id },
    });

    return measureUnit;
  }

  remove(id: string) {
    return this.measureUnitRepository.update(id, { deletedAt: new Date() });
  }
}
