import { Paginator } from '@/src/common/utils/paginator';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProviderDto } from '../dto/provider/create-provider.dto';
import { GetProvidersFilterDto } from '../dto/provider/get-provider.dto';
import { UpdateProviderDto } from '../dto/provider/update-provider.dto';
import { Provider } from '../entities/provider.entity';
import { ProvidersFiltersHandler } from '../filters/provider-filters.handler';

@Injectable()
export class ProviderService {
  constructor(
    @InjectRepository(Provider)
    private providerRepository: Repository<Provider>,
  ) {}

  async create(createProviderDto: CreateProviderDto) {
    return await this.providerRepository.save({
      ...createProviderDto,
    });
  }

  async findAll(filterDto: GetProvidersFilterDto) {
    const { limit, offset } = filterDto;

    const query = this.providerRepository.createQueryBuilder('provider');
    const filterHandler = new ProvidersFiltersHandler();

    query.orderBy('provider.partidaId', 'DESC');

    filterHandler.applyFilters(query, filterDto);

    const paginator = new Paginator<Provider>();
    return await paginator.paginate(query, limit, offset);
  }

  async findOne(id: string) {
    const provider = await this.providerRepository.findOne({
      where: { id },
      withDeleted: false,
    });

    if (!provider) {
      throw new HttpException('Provider unit not found', HttpStatus.NOT_FOUND);
    }

    return provider;
  }

  async update(id: string, updateProviderDto: UpdateProviderDto) {
    const provider = await this.providerRepository.findOne({
      where: { id },
    });

    if (provider.isPublished && updateProviderDto.isDraft) {
      throw new HttpException(
        'This provider is already processed and cannot be edited',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.providerRepository.update(id, {
      ...updateProviderDto,
    });

    return await this.providerRepository.findOne({
      where: { id },
    });
  }

  async remove(id: string) {
    const provider = await this.providerRepository.findOne({
      where: { id },
    });

    await this.providerRepository.update(id, { deletedAt: new Date() });

    return provider;
  }
}
