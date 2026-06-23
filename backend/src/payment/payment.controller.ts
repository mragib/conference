import { Controller, Get } from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { Roles } from 'src/auth/decorators/role.decorators';
import { Role } from 'src/types/types';
import { User } from 'src/user/entities/user.entity';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get('my-payments')
  findMyPayments(@GetUser() user: User) {
    return this.paymentService.findMyPayments(user);
  }

  @Roles(Role.SUPERADMIN, Role.ADMIN, Role.AUTHORITY)
  @Get()
  findAll() {
    return this.paymentService.findAll();
  }
}
