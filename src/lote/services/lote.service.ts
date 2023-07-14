import { HttpException, Injectable } from '@nestjs/common';
import { CreateLoteDto } from '../dto/lote/create-lote.dto';
import { UpdateLoteDto } from '../dto/lote/update-lote.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Lote } from '../entities/lote.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LoteService {
  constructor(
    @InjectRepository(Lote)
    private loteRepository: Repository<Lote>,
  ) {}

  async create(createLoteDto: CreateLoteDto) {
    return await this.loteRepository.save(createLoteDto);
  }

  findAll() {
    return this.loteRepository.find({ withDeleted: false });
  }

  async findOne(id: string) {
    const lote = await this.loteRepository.findOne({
      where: { id },
      withDeleted: false,
    });

    if (!lote) {
      throw new HttpException('Measure unit not found', 404);
    }

    return lote;
  }

  async update(id: string, updateLoteDto: UpdateLoteDto) {
    await this.loteRepository.update(id, updateLoteDto);

    const lote = await this.loteRepository.findOne({
      where: { id },
    });

    return lote;
  }

  remove(id: string) {
    return this.loteRepository.update(id, { deletedAt: new Date() });
  }
}
