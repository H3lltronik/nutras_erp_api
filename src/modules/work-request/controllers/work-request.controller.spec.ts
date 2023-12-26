import { Test, TestingModule } from '@nestjs/testing';
import { LoteController } from './work-request.controller';
import { LoteService } from '../services/work-request.service';

describe('LoteController', () => {
  let controller: LoteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoteController],
      providers: [LoteService],
    }).compile();

    controller = module.get<LoteController>(LoteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
