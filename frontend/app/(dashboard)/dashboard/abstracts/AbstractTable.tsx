"use client";

import { getAbstractColumns } from "@/columns/abstractColumn";
import DataTable from "@/components/DataTable";
import { AbstractType } from "@/lib/type";

const AbstractTable = ({ abstracts }: { abstracts: AbstractType[] }) => {
  const columns = getAbstractColumns();
  return <DataTable columns={columns} data={abstracts} />;
};

export default AbstractTable;
