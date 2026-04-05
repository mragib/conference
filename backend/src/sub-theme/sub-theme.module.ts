import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubTheme } from './entities/sub-theme.entity';
import { SubThemeController } from './sub-theme.controller';
import { SubThemeService } from './sub-theme.service';

@Module({
  imports: [TypeOrmModule.forFeature([SubTheme])],
  controllers: [SubThemeController],
  providers: [SubThemeService],
})
export class SubThemeModule {}
