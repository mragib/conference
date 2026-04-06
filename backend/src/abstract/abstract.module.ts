import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbstractController } from './abstract.controller';
import { AbstractService } from './abstract.service';
import { Abstract } from './entities/abstract.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Abstract])],
  controllers: [AbstractController],
  providers: [AbstractService],
  exports: [AbstractService],
})
export class AbstractModule {}
