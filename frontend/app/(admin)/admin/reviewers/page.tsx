import AdminHeader from "@/components/AdminHeader";
import { getReviewerUsersWithStats } from "@/lib/data-service";
import AddReviewer from "./AddReviewer";
import ReviewerTable from "./ReviewerTable";

const ReviewerPage = async () => {
  const { data: reviewers } = await getReviewerUsersWithStats();

  return (
    <>
      <AdminHeader menuName="Reviewer Management" />
      <div className="p-4">{<AddReviewer />}</div>
      <ReviewerTable reviewers={reviewers} />
    </>
  );
};

export default ReviewerPage;
