import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoteEntryType } from '../../lote/entities/lote_entry_type.entity';

type LoteEntryTypeSeederConfig = {
  naturalLoteEntryTypeId: string;
  divisionLoteEntryTypeId: string;
};

@Injectable()
export class LoteEntryTypeSeederService {
  constructor(
    @InjectRepository(LoteEntryType)
    private loteEntryTypesRepository: Repository<LoteEntryType>,
  ) {}

  async seed(config: LoteEntryTypeSeederConfig) {
    console.log('Seeding lote entry types...');
    const { naturalLoteEntryTypeId, divisionLoteEntryTypeId } = config;

    await this.loteEntryTypesRepository.save([
      { name: 'Natural', id: naturalLoteEntryTypeId },
      { name: 'Division', id: divisionLoteEntryTypeId },
    ]);
  }
}
