import { Injectable } from '@nestjs/common';
import { CreateCoAuthorDto } from './dto/create-co-author.dto';
import { UpdateCoAuthorDto } from './dto/update-co-author.dto';

@Injectable()
export class CoAuthorService {
  create(createCoAuthorDto: CreateCoAuthorDto) {
    return 'This action adds a new coAuthor';
  }

  findAll() {
    return `This action returns all coAuthor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} coAuthor`;
  }

  update(id: number, updateCoAuthorDto: UpdateCoAuthorDto) {
    return `This action updates a #${id} coAuthor`;
  }

  remove(id: number) {
    return `This action removes a #${id} coAuthor`;
  }
}
