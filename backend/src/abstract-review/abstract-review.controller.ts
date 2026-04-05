import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AbstractReviewService } from './abstract-review.service';
import { CreateAbstractReviewDto } from './dto/create-abstract-review.dto';
import { UpdateAbstractReviewDto } from './dto/update-abstract-review.dto';

@Controller('abstract-review')
export class AbstractReviewController {
  constructor(private readonly abstractReviewService: AbstractReviewService) {}

  @Post()
  create(@Body() createAbstractReviewDto: CreateAbstractReviewDto) {
    return this.abstractReviewService.create(createAbstractReviewDto);
  }

  @Get()
  findAll() {
    return this.abstractReviewService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.abstractReviewService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAbstractReviewDto: UpdateAbstractReviewDto) {
    return this.abstractReviewService.update(+id, updateAbstractReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.abstractReviewService.remove(+id);
  }
}
