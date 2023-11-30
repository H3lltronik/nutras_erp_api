import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MeasureUnit } from '../../measure_unit/entities/measure_unit.entity';

@Injectable()
export class MeasureUnitSeederService {
  constructor(
    @InjectRepository(MeasureUnit)
    private measureUnitsRepository: Repository<MeasureUnit>,
  ) {}

  async seed() {
    console.log('Seeding measure units...');
    const units: MeasureUnit[] = [];
    for (let i = 0; i < 10; i++) {
      const unit = this.measureUnitsRepository.create({
        name: faker.science.unit().name,
      });
      units.push(unit);
      await this.measureUnitsRepository.save(unit);
    }
    return units;
  }
}
