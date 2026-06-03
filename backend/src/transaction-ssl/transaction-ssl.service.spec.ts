import { Test, TestingModule } from '@nestjs/testing';
import { TransactionSslService } from './transaction-ssl.service';

describe('TransactionSslService', () => {
  let service: TransactionSslService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionSslService],
    }).compile();

    service = module.get<TransactionSslService>(TransactionSslService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
