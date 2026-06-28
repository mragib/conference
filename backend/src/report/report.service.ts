import { Injectable } from '@nestjs/common';
import { AbstractService } from 'src/abstract/abstract.service';
import { PaymentService } from 'src/payment/payment.service';
import { ReviewerService } from 'src/reviewer/reviewer.service';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ReportService {
  constructor(
    private readonly abstractService: AbstractService,
    private paymentService: PaymentService,
    private reviewerService: ReviewerService,
    private userService: UserService,
  ) {}
  async findReviewerDashboardStats(user: User) {
    const [abstractStats, paymentStats, reviewerStats] = await Promise.all([
      this.abstractService.findAuthorDashboardStats(user),
      this.paymentService.findAuthorDashboardStats(user),
      this.reviewerService.findReviewerStats(user),
    ]);

    return {
      abstractStats,
      paymentStats,
      reviewerStats,
    };
  }

  async findAuthorDashboardStats(user: User) {
    const [abstractStats, paymentStats] = await Promise.all([
      this.abstractService.findAuthorDashboardStats(user),
      this.paymentService.findAuthorDashboardStats(user),
    ]);

    return {
      abstractStats,
      paymentStats,
    };
  }

  async findAdminDashboardStats() {
    const [abstractStats, paymentStats, reviewerStats, userStats] =
      await Promise.all([
        this.abstractService.findAdminDashboardStats(),
        this.paymentService.findAdminDashboardStats(),
        this.reviewerService.findAdminDashboardStats(),
        this.userService.findAdminDashboardStats(),
      ]);

    return {
      abstractStats,
      paymentStats,
      reviewerStats,
      userStats,
    };
  }
}
