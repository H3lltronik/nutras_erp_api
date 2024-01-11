import { Controller, Get } from '@nestjs/common';

@Controller('')
export class AppController {
  @Get()
  index() {
    return 'Nutras API';
  }
}
