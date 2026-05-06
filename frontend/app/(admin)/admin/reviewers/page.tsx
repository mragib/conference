import AdminHeader from "@/components/AdminHeader";
import { getReviewerUsers } from "@/lib/data-service";
import AddReviewer from "./AddReviewer";
import ReviewerTable from "./ReviewerTable";

const ReviewerPage = async () => {
  const { data: reviewers } = await getReviewerUsers();

  return (
    <>
      <AdminHeader menuName="Reviewer Management" />
      <div className="p-4">{<AddReviewer />}</div>
      <ReviewerTable reviewers={reviewers} />
    </>
  );
};

export default ReviewerPage;
