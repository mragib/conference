import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransactionSslService } from './transaction-ssl.service';
import { CreateTransactionSslDto } from './dto/create-transaction-ssl.dto';
import { UpdateTransactionSslDto } from './dto/update-transaction-ssl.dto';

@Controller('transaction-ssl')
export class TransactionSslController {
  constructor(private readonly transactionSslService: TransactionSslService) {}

  @Post()
  create(@Body() createTransactionSslDto: CreateTransactionSslDto) {
    return this.transactionSslService.create(createTransactionSslDto);
  }

  @Get()
  findAll() {
    return this.transactionSslService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionSslService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransactionSslDto: UpdateTransactionSslDto) {
    return this.transactionSslService.update(+id, updateTransactionSslDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionSslService.remove(+id);
  }
}
