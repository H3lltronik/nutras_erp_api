import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';
import { Department } from './entities/department.entity';

const repositories = TypeOrmModule.forFeature([Department]);

@Module({
  controllers: [DepartmentController],
  providers: [DepartmentService],
  imports: [repositories],
  exports: [DepartmentService],
})
export class DepartmentModule {}
