import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RegistrationFeeService } from './registration-fee.service';
import { CreateRegistrationFeeDto } from './dto/create-registration-fee.dto';
import { UpdateRegistrationFeeDto } from './dto/update-registration-fee.dto';

@Controller('registration-fee')
export class RegistrationFeeController {
  constructor(private readonly registrationFeeService: RegistrationFeeService) {}

  @Post()
  create(@Body() createRegistrationFeeDto: CreateRegistrationFeeDto) {
    return this.registrationFeeService.create(createRegistrationFeeDto);
  }

  @Get()
  findAll() {
    return this.registrationFeeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.registrationFeeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegistrationFeeDto: UpdateRegistrationFeeDto) {
    return this.registrationFeeService.update(+id, updateRegistrationFeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.registrationFeeService.remove(+id);
  }
}
