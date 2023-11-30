import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KosherDetails } from '../../product/entities/kosher-details.entity';

@Injectable()
export class KosherDetailsSeederService {
  constructor(
    @InjectRepository(KosherDetails)
    private kosherDetailsRepository: Repository<KosherDetails>,
  ) {}

  async seed() {
    console.log('Seeding kosher details...');
    const kosherDetails = this.kosherDetailsRepository.create({
      agency: faker.company.name(),
      certifiedCompany: faker.company.name(),
      nameOnCertificate: faker.person.fullName(),
      kidOrUkd: faker.string.uuid(),
      certificatePageNumber: faker.number.int({ max: 101 }),
      certificateValidity: faker.date.future(),
    });
    await this.kosherDetailsRepository.save(kosherDetails);
    return kosherDetails;
  }
}
