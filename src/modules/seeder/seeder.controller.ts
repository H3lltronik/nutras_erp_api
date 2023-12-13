import { Controller, Get } from '@nestjs/common';
import { SeederService } from './services/seeder.service';

@Controller('seeder')
export class SeederController {
  constructor(private readonly seederService: SeederService) {}

  @Get()
  async index() {
    if (process.env.NODE_ENV !== 'production') {
      return await this.seederService.seed();
    }
  }
}
