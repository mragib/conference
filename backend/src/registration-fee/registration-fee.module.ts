import { Module } from '@nestjs/common';
import { RegistrationFeeService } from './registration-fee.service';
import { RegistrationFeeController } from './registration-fee.controller';

@Module({
  controllers: [RegistrationFeeController],
  providers: [RegistrationFeeService],
})
export class RegistrationFeeModule {}
