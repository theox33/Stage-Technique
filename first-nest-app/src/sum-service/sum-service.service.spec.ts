import { Test, TestingModule } from '@nestjs/testing';
import { SumServiceService } from './sum-service.service';

describe('SumServiceService', () => {
  let service: SumServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SumServiceService],
    }).compile();

    service = module.get<SumServiceService>(SumServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
