import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewSetting_Seed_Data } from 'src/config/seed-data';
import { Repository } from 'typeorm';
import { CreateReviewSettingDto } from './dto/create-review-setting.dto';
import { ReviewSetting } from './entities/review-setting.entity';

@Injectable()
export class ReviewSettingService {
  constructor(
    @InjectRepository(ReviewSetting)
    private readonly reviewSettingsRepository: Repository<ReviewSetting>,
  ) {}
  create(createReviewSettingDto: CreateReviewSettingDto) {
    return this.reviewSettingsRepository.save(createReviewSettingDto);
  }

  findAll() {
    return this.reviewSettingsRepository.find();
  }
  async seed() {
    return Promise.all(
      ReviewSetting_Seed_Data.map(async (data) => await this.create(data)),
    );
  }
}
