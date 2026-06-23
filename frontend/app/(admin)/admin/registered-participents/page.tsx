import AdminHeader from "@/components/AdminHeader";
import ExportExcelButton from "@/components/ExportExcelButton";
import { getAllPayments } from "@/lib/data-service";
import PaymentsTable from "./PaymentsTable";

const Payments = async () => {
  const { data: payments } = await getAllPayments();

  return (
    <>
      <AdminHeader menuName="Payments" />
      <div className="p-4">
        <ExportExcelButton data={payments} fileName="Registered_Particepent" />

        <PaymentsTable payments={payments} />
      </div>
    </>
  );
};

export default Payments;
