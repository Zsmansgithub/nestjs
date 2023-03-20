import { Test, TestingModule } from '@nestjs/testing';
import { ApidemoService } from './apidemo.service';

describe('ApidemoService', () => {
  let service: ApidemoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApidemoService],
    }).compile();

    service = module.get<ApidemoService>(ApidemoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
