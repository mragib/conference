import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DateSettingSeedData } from 'src/types/types';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { CreateDateSettingDto } from './dto/create-date-setting.dto';
import { DateSetting } from './entities/date-setting.entity';

@Injectable()
export class DateSettingService {
  constructor(
    @InjectRepository(DateSetting)
    private readonly datesettingsRepository: Repository<DateSetting>,
  ) {}
  create(createDateSettingDto: CreateDateSettingDto) {
    return this.datesettingsRepository.save(createDateSettingDto);
  }

  async findTodayRegistrationType() {
    //production
    //const today = new Date();
    //test
    //const today = new Date('2026-06-06T00:00:00'); // Early Bird
    //const today = new Date('2026-07-06T00:00:00'); // Regular
    const today = new Date('2026-08-06T00:00:00'); // Late
    //const today = new Date('2026-09-06T00:00:00'); // No date

    const dateSetting = await this.datesettingsRepository.findOne({
      where: {
        start_date: LessThanOrEqual(today),
        end_date: MoreThanOrEqual(today),
      },
    });
    return dateSetting;
  }

  async seed() {
    return Promise.all(
      DateSettingSeedData.map(async (data) => await this.create(data)),
    );
  }
}
