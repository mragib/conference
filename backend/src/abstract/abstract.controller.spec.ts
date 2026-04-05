import { Test, TestingModule } from '@nestjs/testing';
import { AbstractController } from './abstract.controller';
import { AbstractService } from './abstract.service';

describe('AbstractController', () => {
  let controller: AbstractController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AbstractController],
      providers: [AbstractService],
    }).compile();

    controller = module.get<AbstractController>(AbstractController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
