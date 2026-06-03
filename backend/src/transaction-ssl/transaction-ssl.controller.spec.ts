import { Test, TestingModule } from '@nestjs/testing';
import { TransactionSslController } from './transaction-ssl.controller';
import { TransactionSslService } from './transaction-ssl.service';

describe('TransactionSslController', () => {
  let controller: TransactionSslController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionSslController],
      providers: [TransactionSslService],
    }).compile();

    controller = module.get<TransactionSslController>(TransactionSslController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
