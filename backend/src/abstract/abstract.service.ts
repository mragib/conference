import { Injectable } from '@nestjs/common';
import { CreateAbstractDto } from './dto/create-abstract.dto';
import { UpdateAbstractDto } from './dto/update-abstract.dto';

@Injectable()
export class AbstractService {
  create(createAbstractDto: CreateAbstractDto) {
    return 'This action adds a new abstract';
  }

  findAll() {
    return `This action returns all abstract`;
  }

  findOne(id: number) {
    return `This action returns a #${id} abstract`;
  }

  update(id: number, updateAbstractDto: UpdateAbstractDto) {
    return `This action updates a #${id} abstract`;
  }

  remove(id: number) {
    return `This action removes a #${id} abstract`;
  }
}
