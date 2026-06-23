import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Response } from 'express';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { Public } from 'src/auth/decorators/public.decorators';
import { PaymentStatus } from 'src/types/types';
import { User } from 'src/user/entities/user.entity';
import { CreateTransactionSslDto } from './dto/create-transaction-ssl.dto';
import { UpdateTransactionSslDto } from './dto/update-transaction-ssl.dto';
import { SslService } from './sslcommerz.service';
import { TransactionSslService } from './transaction-ssl.service';

@Controller('transaction-ssl')
export class TransactionSslController {
  constructor(
    private readonly transactionSslService: TransactionSslService,
    private readonly sslService: SslService,

    private readonly configService: ConfigService,
  ) {}

  @Post()
  create(
    @Body() createTransactionSslDto: CreateTransactionSslDto,
    @GetUser() user: User,
  ) {
    return this.transactionSslService.create(createTransactionSslDto, user);
  }

  @Public()
  @Post('success')
  async success(@Body() body: any, @Res() res: Response) {
    const frontendUrl = this.configService.get<string>('FRONTEND_URL');

    if (!body || !body.tran_id) {
      console.error(
        'Payment success callback hit without a valid tran_id:',
        body,
      );
      return res.redirect(`${frontendUrl}/dashboard/payment/fail`);
    }

    const found = await this.transactionSslService.findOne(body.tran_id);

    if (!found) {
      return res.redirect(`${frontendUrl}/dashboard/payment/fail`);
    }

    if (found.status === PaymentStatus.SUCCESS) {
      return res.redirect(`${frontendUrl}/dashboard/payment/success`);
    }

    const validation = await this.sslService.validatePayment(body.val_id);

    if (validation.status !== 'VALID') {
      return res.redirect(`${frontendUrl}/dashboard/payment/fail`);
    }

    if (
      validation.tran_id !== found.id ||
      Number(validation.currency_amount) !== Number(found.amount)
    ) {
      return res.redirect(`${frontendUrl}/dashboard/payment/fail`);
    }

    found.val_id = body.val_id;
    found.store_amount = body.store_amount;

    await this.transactionSslService.success(found);

    return res.redirect(
      `${frontendUrl}/dashboard/payment/success?tran_id=${body.tran_id}`,
    );
  }

  @Public()
  @Post('fail')
  async fail(@Body() body: any, @Res() res: Response) {
    const frontendUrl = this.configService.get<string>('FRONTEND_URL');

    if (!body || !body.tran_id) {
      console.error('Payment fail callback hit without a valid tran_id:', body);
      return res.redirect(`${frontendUrl}/dashboard/payment/fail`);
    }

    const found = await this.transactionSslService.findOne(body.tran_id);
    if (!found) throw new NotFoundException('Transaction is not found');

    await this.transactionSslService.fail(found);

    return res.redirect(`${frontendUrl}/dashboard/payment/fail`);
  }

  @Public()
  @Post('cancel')
  async cancel(@Body() body: any, @Res() res: Response) {
    const frontendUrl = this.configService.get<string>('FRONTEND_URL');

    if (!body || !body.tran_id) {
      console.error(
        'Payment cancel callback hit without a valid tran_id:',
        body,
      );
      return res.redirect(`${frontendUrl}/dashboard/payment/fail`);
    }

    const found = await this.transactionSslService.findOne(body.tran_id);
    if (!found) throw new NotFoundException('Transaction is not found');

    await this.transactionSslService.cancel(found);

    return res.redirect(`${frontendUrl}/dashboard/payment/cancel`);
  }

  @Get()
  findAll() {
    return this.transactionSslService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionSslService.findOne(id);
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
