import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { CreateTransactionSslDto } from './dto/create-transaction-ssl.dto';
import { UpdateTransactionSslDto } from './dto/update-transaction-ssl.dto';
import { TransactionSslService } from './transaction-ssl.service';

@Controller('transaction-ssl')
export class TransactionSslController {
  constructor(private readonly transactionSslService: TransactionSslService) {}

  @Post()
  create(
    @Body() createTransactionSslDto: CreateTransactionSslDto,
    @GetUser() user: User,
  ) {
    return this.transactionSslService.create(createTransactionSslDto, user);
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
  update(
    @Param('id') id: string,
    @Body() updateTransactionSslDto: UpdateTransactionSslDto,
  ) {
    return this.transactionSslService.update(+id, updateTransactionSslDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionSslService.remove(+id);
  }
}
