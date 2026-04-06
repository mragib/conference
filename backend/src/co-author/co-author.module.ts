import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoAuthorController } from './co-author.controller';
import { CoAuthorService } from './co-author.service';
import { CoAuthor } from './entities/co-author.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CoAuthor])],
  controllers: [CoAuthorController],
  providers: [CoAuthorService],
})
export class CoAuthorModule {}
