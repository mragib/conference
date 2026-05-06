"use client";
import { getAbstractsColumn } from "@/columns/abstractsColumn";
import DataTable from "@/components/DataTable";
import { AbstractType } from "@/lib/type";

const AbstractsTable = ({ abstracts }: { abstracts: AbstractType[] }) => {
  const columns = getAbstractsColumn();
  return <DataTable columns={columns} data={abstracts} />;
};

export default AbstractsTable;
