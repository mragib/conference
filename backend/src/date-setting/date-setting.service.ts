import { Injectable } from '@nestjs/common';
import { CreateDateSettingDto } from './dto/create-date-setting.dto';
import { UpdateDateSettingDto } from './dto/update-date-setting.dto';

@Injectable()
export class DateSettingService {
  create(createDateSettingDto: CreateDateSettingDto) {
    return 'This action adds a new dateSetting';
  }

  findAll() {
    return `This action returns all dateSetting`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dateSetting`;
  }

  update(id: number, updateDateSettingDto: UpdateDateSettingDto) {
    return `This action updates a #${id} dateSetting`;
  }

  remove(id: number) {
    return `This action removes a #${id} dateSetting`;
  }
}
