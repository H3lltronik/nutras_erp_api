import { HttpException, Injectable } from '@nestjs/common';
import { CreateLoteDto } from '../dto/work-request/create-lote.dto';
import { UpdateLoteDto } from '../dto/work-request/update-lote.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Lote } from '../entities/work-request.entity';
import { Batch, Repository } from 'typeorm';
import { Paginator } from '@/src/common/utils/paginator';
import { GetLotesFilterDto } from '../dto/work-request/get-lote.dto';

@Injectable()
export class LoteService {
  constructor(
    @InjectRepository(Lote)
    private loteRepository: Repository<Lote>,
  ) {}

  async create(createLoteDto: CreateLoteDto) {
    return await this.loteRepository.save(createLoteDto);
  }

  async findAll(filterDto: GetLotesFilterDto) {
    const { limit, offset, withDeleted } = filterDto;

    const query = this.loteRepository.createQueryBuilder('lote');
    if (withDeleted === 'true') query.withDeleted();

    const paginator = new Paginator<Lote>();
    return await paginator.paginate(query, limit, offset);
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
