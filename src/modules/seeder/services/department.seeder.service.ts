import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from '../../department/entities/department.entity';

type DepartmentSeederConfig = {
  directionDepartmentId: string;
  productionDepartmentId: string;
  purchasesDepartmentId: string;
};

@Injectable()
export class DepartmentSeederService {
  constructor(
    @InjectRepository(Department)
    private departmentsRepository: Repository<Department>,
  ) {}

  async seed(config: DepartmentSeederConfig) {
    console.log('Seeding departments...');
    const {
      directionDepartmentId,
      productionDepartmentId,
      purchasesDepartmentId,
    } = config;

    return await this.departmentsRepository.save([
      { name: 'Produccion', id: productionDepartmentId },
      { name: 'Compras', id: purchasesDepartmentId },
      { name: 'Direccion', id: directionDepartmentId },
    ]);
  }
}
