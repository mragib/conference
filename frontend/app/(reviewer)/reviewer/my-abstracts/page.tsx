import AbstractTable from "@/app/(dashboard)/dashboard/abstracts/AbstractTable";
import ReviewerHeader from "@/components/ReviewerHeader";
import { getMyAbstracts } from "@/lib/data-service";

const ReviewerOwnAbstractPage = async () => {
  const { data: abstracts } = await getMyAbstracts();
  return (
    <div className="overflow-y-hidden">
      <ReviewerHeader menuName="Abstracts" menuText="My Own Abstracts" />
      <div className="p-6 md:p-12 overflow-y-auto custom-scrollbar">
        <AbstractTable abstracts={abstracts} url="/reviewer/my-abstracts" />
      </div>
    </div>
  );
};

export default ReviewerOwnAbstractPage;
