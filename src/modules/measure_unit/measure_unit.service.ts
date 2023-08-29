import { Paginator } from '@/src/common/utils/paginator';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMeasureUnitDto } from './dto/create-measure_unit.dto';
import { GetMeasureUnitFilterDto } from './dto/get-measure_units.dto';
import { UpdateMeasureUnitDto } from './dto/update-measure_unit.dto';
import { MeasureUnit } from './entities/measure_unit.entity';
import { MeasureUnitsFiltersHandler } from './filters/measure_units-filters.handler';

@Injectable()
export class MeasureUnitService {
  constructor(
    @InjectRepository(MeasureUnit)
    private measureUnitRepository: Repository<MeasureUnit>,
  ) {}

  async create(createMeasureUnitDto: CreateMeasureUnitDto) {
    return await this.measureUnitRepository.save(createMeasureUnitDto);
  }

  async findAll(filterDto: GetMeasureUnitFilterDto) {
    const { limit, offset } = filterDto;

    const query = this.measureUnitRepository.createQueryBuilder('measure_unit');
    const filterHandler = new MeasureUnitsFiltersHandler();

    filterHandler.applyFilters(query, filterDto);

    const paginator = new Paginator<MeasureUnit>();
    return await paginator.paginate(query, limit, offset);
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
