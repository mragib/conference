"use client";
import { getAbstractsColumn } from "@/columns/abstractsColumn";
import DataTable from "@/components/DataTable";
import { AbstractType, REVEIWER_USER_TYPE } from "@/lib/type";

const AbstractsTable = ({
  abstracts,
  reviewers,
}: {
  abstracts: AbstractType[];
  reviewers: REVEIWER_USER_TYPE[];
}) => {
  const columns = getAbstractsColumn(reviewers);
  return <DataTable columns={columns} data={abstracts} />;
};

export default AbstractsTable;
