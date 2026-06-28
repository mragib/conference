import { Controller, Get } from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { Roles } from 'src/auth/decorators/role.decorators';
import { Role } from 'src/types/types';
import { User } from 'src/user/entities/user.entity';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Roles(Role.RESEARCHER)
  @Get('author-dashboard-stats')
  findAuthorDashboardStats(@GetUser() user: User) {
    return this.reportService.findAuthorDashboardStats(user);
  }

  @Roles(Role.REVIEWER)
  @Get('reviewer-dashboard-stats')
  findReviewerDashboardStats(@GetUser() user: User) {
    return this.reportService.findReviewerDashboardStats(user);
  }

  @Roles(Role.SUPERADMIN, Role.ADMIN, Role.AUTHORITY)
  @Get('admin-dashboard-stats')
  findAdminDashboardStats() {
    return this.reportService.findAdminDashboardStats();
  }
}
