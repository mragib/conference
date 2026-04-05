import { Module } from '@nestjs/common';
import { CoAuthorService } from './co-author.service';
import { CoAuthorController } from './co-author.controller';

@Module({
  controllers: [CoAuthorController],
  providers: [CoAuthorService],
})
export class CoAuthorModule {}
