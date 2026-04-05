import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorators';
import { CreateSessionDto } from './dto/create-session.dto';
import { SessionService } from './session.service';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Public()
  @Post()
  create(@Body() createSessionDto: CreateSessionDto) {
    return this.sessionService.create(createSessionDto);
  }

  @Get()
  findAll() {
    return this.sessionService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sessionService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sessionService.remove(id);
  }
}
