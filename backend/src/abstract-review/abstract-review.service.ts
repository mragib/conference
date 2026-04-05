import { Injectable } from '@nestjs/common';
import { CreateAbstractReviewDto } from './dto/create-abstract-review.dto';
import { UpdateAbstractReviewDto } from './dto/update-abstract-review.dto';

@Injectable()
export class AbstractReviewService {
  create(createAbstractReviewDto: CreateAbstractReviewDto) {
    return 'This action adds a new abstractReview';
  }

  findAll() {
    return `This action returns all abstractReview`;
  }

  findOne(id: number) {
    return `This action returns a #${id} abstractReview`;
  }

  update(id: number, updateAbstractReviewDto: UpdateAbstractReviewDto) {
    return `This action updates a #${id} abstractReview`;
  }

  remove(id: number) {
    return `This action removes a #${id} abstractReview`;
  }
}
