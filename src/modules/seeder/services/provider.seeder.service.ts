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
    // const providers: Provider[] = [];
    // for (let i = 0; i < 10; i++) {
    //   const provider = this.providersRepository.create({
    //     isDraft: faker.datatype.boolean(),
    //     isPublished: faker.datatype.boolean(),
    //     name: faker.company.name(),
    //     businessName: faker.company.name(),
    //     service: faker.company.bs(),
    //     lada: faker.string.alphanumeric({ length: 3 }),
    //     phone: faker.phone.number(),
    //     email: faker.internet.email(),
    //     paymentEmail: faker.internet.email(),
    //     bank: faker.company.name(),
    //     clabeAccount: faker.finance.bic(),
    //     accountNumber: faker.finance.account(),
    //   });
    //   providers.push(provider);
    //   await this.providersRepository.save(provider);
    // }
    
    // return providers;
    
    const providers: Partial<Provider>[] = [
      {
        id: '170f3bfc-e97c-4d93-a67f-e4f756eba5a9',
        code: '0001',
        name: 'Nutribites',
        businessName: 'Nutribites',
        service: 'Proveedor de PP`s',
        hidden: true,
      }
    ];
    await this.providersRepository.save(providers);
  }
}
