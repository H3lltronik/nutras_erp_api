import { Test, TestingModule } from '@nestjs/testing';
import { MeasureUnitController } from './measure_unit.controller';
import { MeasureUnitService } from './measure_unit.service';

describe('MeasureUnitController', () => {
  let controller: MeasureUnitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MeasureUnitController],
      providers: [MeasureUnitService],
    }).compile();

    controller = module.get<MeasureUnitController>(MeasureUnitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
