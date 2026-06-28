import { AbstractStatsCard } from "@/components/AbstractStatsCard";
import { PaymentStatsCard } from "@/components/PaymentStatsCard";
import ReviewerHeader from "@/components/ReviewerHeader";
import { ReviewerStatsCard } from "@/components/ReviewerStatsCard";
import { getReviewerDashboardData } from "@/lib/data-service";

type DashboardData = {
  abstractStats: {
    total: string;
    accepted: string | null;
    pending: string | null;
    rejected: string | null;
    reviewed: string | null;
    saved: string | null;
  };
  paymentStats: {
    registrationType: string;
    currency: string;
    userType: string;
    registrationCategory: string;
    count: string;
    amount: string;
  }[];
  reviewerStats: {
    total_assigned: string;
    total_agreed: string;
    total_declined: string;
    total_pending: string;
    total_reviewed: string;
  };
};

const ReviewerPage = async () => {
  const { data }: { data: DashboardData } = await getReviewerDashboardData();

  return (
    <div className="overflow-y-hidden">
      <ReviewerHeader
        menuName="Review Desk"
        menuText="Evaluation Management & Reports"
      />

      <div className="p-6 md:p-12 overflow-y-auto custom-scrollbar grid grid-cols-1 md:grid-cols-3 gap-4">
        <AbstractStatsCard data={data.abstractStats} />
        <ReviewerStatsCard data={data.reviewerStats} />
        <PaymentStatsCard data={data.paymentStats} />
      </div>
    </div>
  );
};

export default ReviewerPage;
