"use client";
import { getPaymentColumns } from "@/columns/paymentsColumn";
import DataTable from "@/components/DataTable";
import { PAYMENT_TYPE_FOR_TABLE } from "@/lib/type";

const PaymentsTable = ({
  payments,
}: {
  payments: PAYMENT_TYPE_FOR_TABLE[];
}) => {
  const columns = getPaymentColumns();

  return <DataTable columns={columns} data={payments} />;
};

export default PaymentsTable;
