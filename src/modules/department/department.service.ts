import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { GetDepartmentsFilterDto } from './dto/get-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './entities/department.entity';
import { DepartmentFiltersHandler } from './filters/departments-filters.handler';
import { Paginator } from '@/src/common/utils/paginator';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}

  async create(createDepartmentDto: CreateDepartmentDto) {
    try {
      return await this.departmentRepository.save(createDepartmentDto);
    } catch (error) {
      if (error.code === '23505') {
        throw new HttpException('Department already exists', 409);
      }
    }
  }

  async findAll(filterDto: GetDepartmentsFilterDto) {
    const { limit, offset } = filterDto;

    const query = this.departmentRepository.createQueryBuilder('user');
    const filterHandler = new DepartmentFiltersHandler();

    filterHandler.applyFilters(query, filterDto);

    const paginator = new Paginator<Department>();
    return await paginator.paginate(query, limit, offset);
  }

  async findOne(id: string) {
    const department = await this.departmentRepository.findOne({
      where: { id },
      withDeleted: false,
    });

    if (!department) {
      throw new HttpException('Measure unit not found', 404);
    }

    return department;
  }

  async update(id: string, updateDepartmentDto: UpdateDepartmentDto) {
    await this.departmentRepository.update(id, updateDepartmentDto);

    const department = await this.departmentRepository.findOne({
      where: { id },
    });

    return department;
  }

  remove(id: string) {
    return this.departmentRepository.update(id, { deletedAt: new Date() });
  }
}
