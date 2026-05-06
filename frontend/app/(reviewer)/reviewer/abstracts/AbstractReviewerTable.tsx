"use client";

import { getReviewerAbstractColumn } from "@/columns/reviewerAbstractColumn";
import DataTable from "@/components/DataTable";
import { ReviewerAbstractType } from "@/lib/type";

const AbstractReviewerTable = ({ data }: { data: ReviewerAbstractType[] }) => {
  const columns = getReviewerAbstractColumn();
  return <DataTable columns={columns} data={data} />;
};

export default AbstractReviewerTable;
