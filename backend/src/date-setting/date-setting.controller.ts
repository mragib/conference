import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DateSettingService } from './date-setting.service';
import { CreateDateSettingDto } from './dto/create-date-setting.dto';
import { UpdateDateSettingDto } from './dto/update-date-setting.dto';

@Controller('date-setting')
export class DateSettingController {
  constructor(private readonly dateSettingService: DateSettingService) {}

  @Post()
  create(@Body() createDateSettingDto: CreateDateSettingDto) {
    return this.dateSettingService.create(createDateSettingDto);
  }

  @Get()
  findAll() {
    return this.dateSettingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dateSettingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDateSettingDto: UpdateDateSettingDto) {
    return this.dateSettingService.update(+id, updateDateSettingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dateSettingService.remove(+id);
  }
}
