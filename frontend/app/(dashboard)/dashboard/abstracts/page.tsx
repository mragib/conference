import { DashboardHeader } from "@/components/DashboardHeader";
import { getMyAbstracts } from "@/lib/data-service";
import AbstractTable from "./AbstractTable";

const AbstractsPage = async () => {
  const { data: abstracts } = await getMyAbstracts();
  return (
    <div className="overflow-y-hidden">
      <DashboardHeader menuName="Abstracts" />
      <div className="p-6 md:p-12 overflow-y-auto custom-scrollbar">
        <AbstractTable abstracts={abstracts} url="/dashboard/abstracts" />
      </div>
    </div>
  );
};

export default AbstractsPage;
