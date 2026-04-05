import { Test, TestingModule } from '@nestjs/testing';
import { AbstractReviewService } from './abstract-review.service';

describe('AbstractReviewService', () => {
  let service: AbstractReviewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AbstractReviewService],
    }).compile();

    service = module.get<AbstractReviewService>(AbstractReviewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
