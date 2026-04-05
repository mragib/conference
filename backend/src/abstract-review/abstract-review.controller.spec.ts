import { Test, TestingModule } from '@nestjs/testing';
import { AbstractReviewController } from './abstract-review.controller';
import { AbstractReviewService } from './abstract-review.service';

describe('AbstractReviewController', () => {
  let controller: AbstractReviewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AbstractReviewController],
      providers: [AbstractReviewService],
    }).compile();

    controller = module.get<AbstractReviewController>(AbstractReviewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
