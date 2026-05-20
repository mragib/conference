"use client";

import { getAbstractColumns } from "@/columns/abstractColumn";
import DataTable from "@/components/DataTable";
import { AbstractType } from "@/lib/type";

const AbstractTable = ({
  abstracts,
  url,
}: {
  abstracts: AbstractType[];
  url: string;
}) => {
  const columns = getAbstractColumns(url);
  return <DataTable columns={columns} data={abstracts} />;
};

export default AbstractTable;
