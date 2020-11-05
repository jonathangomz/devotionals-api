import { Test, TestingModule } from '@nestjs/testing';
import { DevotionalsService } from './devotionals.service';

describe('DevotionalsService', () => {
  let service: DevotionalsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DevotionalsService],
    }).compile();

    service = module.get<DevotionalsService>(DevotionalsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
