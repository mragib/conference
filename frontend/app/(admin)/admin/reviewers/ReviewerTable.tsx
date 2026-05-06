"use client";
import { getReviewerColumns } from "@/columns/ReviewersColumn";
import DataTable from "@/components/DataTable";
import { REVEIWER_USER_TYPE } from "@/lib/type";

const ReviewerTable = ({ reviewers }: { reviewers: REVEIWER_USER_TYPE[] }) => {
  const columns = getReviewerColumns();
  return <DataTable columns={columns} data={reviewers} />;
};

export default ReviewerTable;
