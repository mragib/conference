import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AbstractService } from './abstract.service';
import { CreateAbstractDto } from './dto/create-abstract.dto';
import { UpdateAbstractDto } from './dto/update-abstract.dto';

@Controller('abstract')
export class AbstractController {
  constructor(private readonly abstractService: AbstractService) {}

  @Post()
  create(@Body() createAbstractDto: CreateAbstractDto) {
    return this.abstractService.create(createAbstractDto);
  }

  @Get()
  findAll() {
    return this.abstractService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.abstractService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAbstractDto: UpdateAbstractDto) {
    return this.abstractService.update(+id, updateAbstractDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.abstractService.remove(+id);
  }
}
