import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbstractAssignModule } from 'src/abstract-assign/abstract-assign.module';
import { ReviewerModule } from 'src/reviewer/reviewer.module';
import { AbstractController } from './abstract.controller';
import { AbstractService } from './abstract.service';
import { Abstract } from './entities/abstract.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Abstract]),
    ReviewerModule,
    AbstractAssignModule,
  ],
  controllers: [AbstractController],
  providers: [AbstractService],
  exports: [AbstractService],
})
export class AbstractModule {}
