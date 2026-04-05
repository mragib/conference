import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CoAuthorService } from './co-author.service';
import { CreateCoAuthorDto } from './dto/create-co-author.dto';
import { UpdateCoAuthorDto } from './dto/update-co-author.dto';

@Controller('co-author')
export class CoAuthorController {
  constructor(private readonly coAuthorService: CoAuthorService) {}

  @Post()
  create(@Body() createCoAuthorDto: CreateCoAuthorDto) {
    return this.coAuthorService.create(createCoAuthorDto);
  }

  @Get()
  findAll() {
    return this.coAuthorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coAuthorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoAuthorDto: UpdateCoAuthorDto) {
    return this.coAuthorService.update(+id, updateCoAuthorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coAuthorService.remove(+id);
  }
}
