import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegistrationFeeSeedData } from 'src/config/seed-data';
import { DateSettingService } from 'src/date-setting/date-setting.service';
import { ProfileService } from 'src/profile/profile.service';
import { CountryType, CurrencyType, RegistrationType } from 'src/types/types';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateRegistrationFeeDto } from './dto/create-registration-fee.dto';
import { FindRegistrationFeeDto } from './dto/find-registration-fee.dto';
import { RegistrationFee } from './entities/registration-fee.entity';

@Injectable()
export class RegistrationFeeService {
  constructor(
    @InjectRepository(RegistrationFee)
    private readonly registrationFeeRepository: Repository<RegistrationFee>,
    private readonly profileService: ProfileService,
    private readonly dateSettingService: DateSettingService,
  ) {}

  create(createRegistrationFeeDto: CreateRegistrationFeeDto) {
    return this.registrationFeeRepository.save(createRegistrationFeeDto);
  }

  async seed() {
    return Promise.all(
      RegistrationFeeSeedData.map(async (data) => await this.create(data)),
    );
  }

  async myFees(type: FindRegistrationFeeDto, user: User) {
    const dateSetting =
      await this.dateSettingService.findTodayRegistrationType();

    if (!dateSetting) {
      throw new NotFoundException('Payment date is over');
    }

    const profileResponse = await this.profileService.profile(user);

    if (!profileResponse || profileResponse.statusCode === 404) {
      throw new NotFoundException('Profile is not created');
    }

    const profile = profileResponse.data;

    const countryType =
      profile.country === 'BD' ? CountryType.LOCAL : CountryType.INTERNATIONAL;

    const currency =
      profile.country === 'BD' ? CurrencyType.BDT : CurrencyType.USD;

    const fee = await this.registrationFeeRepository.findOne({
      where: {
        registration_category: type.registration_category,
        user_type: profile.user_type,
        country_type: countryType,
      },
    });

    if (!fee) {
      throw new NotFoundException('Fee configuration not found');
    }

    let amount: number;

    switch (dateSetting.name) {
      case RegistrationType.EARLY_BIRD:
        amount = Number(fee.early_bird_amount);
        break;

      case RegistrationType.REGULAR:
        amount = Number(fee.regular_amount);
        break;

      case RegistrationType.LATE:
        amount = Number(fee.late_amount);
        break;

      default:
        throw new BadRequestException('Invalid registration period');
    }

    return {
      id: fee.id,
      registration_category: type.registration_category,
      user_type: profile.user_type,
      country_type: countryType,
      registration_type: dateSetting.name,
      amount,
      currency,
    };
  }
}
