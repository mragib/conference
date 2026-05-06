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
      <AbstractReviewerTable data={data} />
    </>
  );
};

export default PendingReview;
