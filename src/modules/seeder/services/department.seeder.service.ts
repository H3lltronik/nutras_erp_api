import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from '../../department/entities/department.entity';

type DepartmentSeederConfig = {
  directionDepartmentId: string;
  productionDepartmentId: string;
  purchasesDepartmentId: string;
  qualityDepartmentId: string;
  warehouseDepartmentId: string;
  salesDepartmentId: string;
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
      qualityDepartmentId,
      warehouseDepartmentId,
      salesDepartmentId,
    } = config;

    return await this.departmentsRepository.save([
      { name: 'Producción', id: productionDepartmentId },
      { name: 'Compras', id: purchasesDepartmentId },
      { name: 'Dirección', id: directionDepartmentId },
      { name: 'Calidad', id: qualityDepartmentId },
      { name: 'Almacén', id: warehouseDepartmentId },
      { name: 'Ventas', id: salesDepartmentId },
    ]);
  }
}
