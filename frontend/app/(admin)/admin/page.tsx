import { AbstractStatsCard } from "@/components/AbstractStatsCard";
import AdminHeader from "@/components/AdminHeader";
import { AdminPaymentCard } from "@/components/AdminPaymentCard";
import { ReviewerStatsCard } from "@/components/ReviewerStatsCard";
import { UserStatsCard } from "@/components/UserStatsCard";
import { getAdminDashboardData } from "@/lib/data-service";

const Admin = async () => {
  const { data }: { data } = await getAdminDashboardData();

  return (
    <div className="overflow-y-hidden">
      <AdminHeader menuName="Admin Control Center" />
      <div className="p-6 md:p-12 overflow-y-auto custom-scrollbar grid grid-cols-1 md:grid-cols-2 gap-4">
        <AbstractStatsCard data={data.abstractStats} />

        <ReviewerStatsCard data={data.reviewerStats} />
        <AdminPaymentCard data={data.paymentStats} />
        <UserStatsCard data={data.userStats} />
      </div>
    </div>
  );
};

export default Admin;
