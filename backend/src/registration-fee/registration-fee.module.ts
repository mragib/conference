import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DateSettingModule } from 'src/date-setting/date-setting.module';
import { ProfileModule } from 'src/profile/profile.module';
import { RegistrationFee } from './entities/registration-fee.entity';
import { RegistrationFeeController } from './registration-fee.controller';
import { RegistrationFeeService } from './registration-fee.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RegistrationFee]),
    ProfileModule,
    DateSettingModule,
  ],
  controllers: [RegistrationFeeController],
  providers: [RegistrationFeeService],
})
export class RegistrationFeeModule {}
