import { Test, TestingModule } from '@nestjs/testing';
import { DevotionalsController } from './devotionals.controller';

describe('DevotionalsController', () => {
  let controller: DevotionalsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DevotionalsController],
    }).compile();

    controller = module.get<DevotionalsController>(DevotionalsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
