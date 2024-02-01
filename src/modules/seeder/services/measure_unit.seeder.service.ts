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
    const units: Partial<MeasureUnit>[] = [
      {
        name: 'Kg'
      },
      {
        name: 'L'
      },
      {
        name: 'Pieza'
      },
      {
        name: 'Paquete'
      },
    ];

    let unitsSaved = [];
    for (const productPresentation of units) {
      const productPresentationEntity = await this.measureUnitsRepository.findOne({
        where: { name: productPresentation.name },
      });
      if (!productPresentationEntity) {
        await this.measureUnitsRepository.save(productPresentation);
      } else {
        await this.measureUnitsRepository.update(productPresentationEntity.id, productPresentation);
      }
      unitsSaved.push(productPresentation);
    }
    return unitsSaved;
  }
}
