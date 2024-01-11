import { Controller, Get } from '@nestjs/common';

@Controller('')
export class HealthCheckController {
  @Get()
  index() {
    return 'Nutras API';
  }
}
