import { HttpException, Injectable } from '@nestjs/common';
import { CreateLoteDto } from '../dto/lote/create-lote.dto';
import { UpdateLoteDto } from '../dto/lote/update-lote.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoteEntryType } from '../entities/lote_entry_type.entity';

@Injectable()
export class LoteEntryTypeService {
  constructor(
    @InjectRepository(LoteEntryType)
    private loteEntryTypeRepository: Repository<LoteEntryType>,
  ) {}

  async create(createLoteDto: CreateLoteDto) {
    return await this.loteEntryTypeRepository.save(createLoteDto);
  }

  findAll() {
    return this.loteEntryTypeRepository.find({ withDeleted: false });
  }

  async findOne(id: string) {
    const lote = await this.loteEntryTypeRepository.findOne({
      where: { id },
      withDeleted: false,
    });

    if (!lote) {
      throw new HttpException('Measure unit not found', 404);
    }

    return lote;
  }

  async update(id: string, updateLoteDto: UpdateLoteDto) {
    await this.loteEntryTypeRepository.update(id, updateLoteDto);

    const lote = await this.loteEntryTypeRepository.findOne({
      where: { id },
    });

    return lote;
  }

  remove(id: string) {
    return this.loteEntryTypeRepository.update(id, { deletedAt: new Date() });
  }
}
