import { Test, TestingModule } from '@nestjs/testing';
import { ApidemoController } from './apidemo.controller';
import { ApidemoService } from './apidemo.service';

describe('ApidemoController', () => {
  let controller: ApidemoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApidemoController],
      providers: [ApidemoService],
    }).compile();

    controller = module.get<ApidemoController>(ApidemoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
