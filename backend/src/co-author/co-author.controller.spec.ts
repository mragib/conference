import { Test, TestingModule } from '@nestjs/testing';
import { CoAuthorController } from './co-author.controller';
import { CoAuthorService } from './co-author.service';

describe('CoAuthorController', () => {
  let controller: CoAuthorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoAuthorController],
      providers: [CoAuthorService],
    }).compile();

    controller = module.get<CoAuthorController>(CoAuthorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
