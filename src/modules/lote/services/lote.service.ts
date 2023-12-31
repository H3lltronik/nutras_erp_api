import { Paginator } from '@/src/common/utils/paginator';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLoteDto } from '../dto/lote/create-lote.dto';
import { GetLotesFilterDto } from '../dto/lote/get-lote.dto';
import { UpdateLoteDto } from '../dto/lote/update-lote.dto';
import { Lote } from '../entities/lote.entity';

type FindOneParams = {
  id: string;
  relations?: {
    warehouse?: boolean;
    loteEntryType?: boolean;
    product?: boolean;
  };
};

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

  async findOne(params: FindOneParams) {
    const { id, relations } = params;
    const lote = await this.loteRepository.findOne({
      where: { id },
      withDeleted: false,
      relations: Object.keys(relations).filter(
        (key) => relations[key] === true,
      ),
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
