import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Provider } from '../../provider/entities/provider.entity';

@Injectable()
export class ProviderSeederService {
  constructor(
    @InjectRepository(Provider)
    private providersRepository: Repository<Provider>,
  ) {}

  async seed() {
    console.log('Seeding providers...');
    const providers: Provider[] = [];
    for (let i = 0; i < 10; i++) {
      const provider = this.providersRepository.create({
        isDraft: faker.datatype.boolean(),
        isPublished: faker.datatype.boolean(),
        name: faker.company.name(),
        businessName: faker.company.name(),
        service: faker.company.bs(),
        lada: faker.string.alphanumeric({ length: 3 }),
        phone: faker.phone.number(),
        email: faker.internet.email(),
        paymentEmail: faker.internet.email(),
        bank: faker.company.name(),
        clabeAccount: faker.finance.bic(),
        accountNumber: faker.finance.account(),
      });
      providers.push(provider);
      await this.providersRepository.save(provider);
    }

    return providers;
  }
}
