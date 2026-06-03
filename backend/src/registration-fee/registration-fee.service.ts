import { Injectable } from '@nestjs/common';
import { CreateRegistrationFeeDto } from './dto/create-registration-fee.dto';
import { UpdateRegistrationFeeDto } from './dto/update-registration-fee.dto';

@Injectable()
export class RegistrationFeeService {
  create(createRegistrationFeeDto: CreateRegistrationFeeDto) {
    return 'This action adds a new registrationFee';
  }

  findAll() {
    return `This action returns all registrationFee`;
  }

  findOne(id: number) {
    return `This action returns a #${id} registrationFee`;
  }

  update(id: number, updateRegistrationFeeDto: UpdateRegistrationFeeDto) {
    return `This action updates a #${id} registrationFee`;
  }

  remove(id: number) {
    return `This action removes a #${id} registrationFee`;
  }
}
