import { Module } from '@nestjs/common';
import { AbstractService } from './abstract.service';
import { AbstractController } from './abstract.controller';

@Module({
  controllers: [AbstractController],
  providers: [AbstractService],
})
export class AbstractModule {}
