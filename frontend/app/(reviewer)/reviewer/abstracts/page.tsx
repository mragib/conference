import ReviewerHeader from "@/components/ReviewerHeader";
import { getReviewerAbstracts } from "@/lib/data-service";
import AbstractReviewerTable from "./AbstractReviewerTable";

const PendingReview = async () => {
  const { data } = await getReviewerAbstracts();

  return (
    <>
      <ReviewerHeader
        menuName="Review Desk"
        menuText="Evaluation Management & Reports"
      />
      <div className="p-6 md:p-12 overflow-y-auto custom-scrollbar">
        <AbstractReviewerTable data={data} />
      </div>
    </>
  );
};

export default PendingReview;
