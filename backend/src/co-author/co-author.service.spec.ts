import { Test, TestingModule } from '@nestjs/testing';
import { CoAuthorService } from './co-author.service';

describe('CoAuthorService', () => {
  let service: CoAuthorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoAuthorService],
    }).compile();

    service = module.get<CoAuthorService>(CoAuthorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
