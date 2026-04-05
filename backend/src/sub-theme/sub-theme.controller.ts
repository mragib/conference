import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorators';
import { Roles } from 'src/auth/decorators/role.decorators';
import { Role } from 'src/types/types';
import { CreateSubThemeDto } from './dto/create-sub-theme.dto';
import { UpdateSubThemeDto } from './dto/update-sub-theme.dto';
import { SubThemeService } from './sub-theme.service';

@Controller('sub-theme')
export class SubThemeController {
  constructor(private readonly subThemeService: SubThemeService) {}

  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @Post()
  create(@Body() createSubThemeDto: CreateSubThemeDto) {
    return this.subThemeService.create(createSubThemeDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.subThemeService.findAll();
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const found = await this.subThemeService.findOne(id);
    if (!found) throw new NotFoundException('Sub theme is not found');
    return found;
  }

  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSubThemeDto: UpdateSubThemeDto,
  ) {
    return this.subThemeService.update(id, updateSubThemeDto);
  }

  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subThemeService.remove(id);
  }
}
