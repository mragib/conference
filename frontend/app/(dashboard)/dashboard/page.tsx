import { DashboardHeader } from "@/components/DashboardHeader";

const Dashboard = () => {
  return (
    <div className="overflow-y-hidden">
      <DashboardHeader menuName="Dashboard" />
      <div className="p-6 md:p-12 overflow-y-auto custom-scrollbar">
        <p>Dashboard</p>
      </div>
    </div>
  );
};

export default Dashboard;
