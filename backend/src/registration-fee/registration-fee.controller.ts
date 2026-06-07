import { Body, Controller, Get, Post } from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { Roles } from 'src/auth/decorators/role.decorators';
import { Role } from 'src/types/types';
import { User } from 'src/user/entities/user.entity';
import { FindRegistrationFeeDto } from './dto/find-registration-fee.dto';
import { RegistrationFeeService } from './registration-fee.service';

@Controller('registration-fee')
export class RegistrationFeeController {
  constructor(
    private readonly registrationFeeService: RegistrationFeeService,
  ) {}
  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @Get('seed')
  seed() {
    return this.registrationFeeService.seed();
  }

  @Post('my-fees')
  myFees(
    @Body() findregistrationFee: FindRegistrationFeeDto,
    @GetUser() user: User,
  ) {
    return this.registrationFeeService.myFees(findregistrationFee, user);
  }
}
