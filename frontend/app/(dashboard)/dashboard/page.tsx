import { AbstractStatsCard } from "@/components/AbstractStatsCard";
import { DashboardHeader } from "@/components/DashboardHeader";
import { PaymentStatsCard } from "@/components/PaymentStatsCard";
import { getAuthorDashboardData } from "@/lib/data-service";

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
};

const Dashboard = async () => {
  const { data }: { data: DashboardData } = await getAuthorDashboardData();

  return (
    <div className="overflow-y-hidden">
      <DashboardHeader menuName="Dashboard" />
      <div className="p-6 md:p-12 overflow-y-auto custom-scrollbar grid grid-cols-1 md:grid-cols-2 gap-4">
        <AbstractStatsCard data={data.abstractStats} />
        <PaymentStatsCard data={data.paymentStats} />
      </div>
    </div>
  );
};

export default Dashboard;
