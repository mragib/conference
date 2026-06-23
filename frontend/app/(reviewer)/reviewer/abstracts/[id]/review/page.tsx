import ReviewerHeader from "@/components/ReviewerHeader";
import {
  getAbstractDetailsForReviewer,
  getReviewCritaria,
} from "@/lib/data-service";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import AbstractReviewForm from "./AbstractReviewForm";

const AbstractReviewPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const { data } = await getReviewCritaria();

  const { user } = await getSession();

  if (!user) redirect("/signin");

  const criteriaByType = data.reduce(
    (acc, item) => {
      (acc[item.type] ??= []).push(item);
      return acc;
    },
    {} as Record<string, typeof data>,
  );

  for (const type in criteriaByType) {
    criteriaByType[type].sort((a, b) => b.value - a.value);
  }
  const abstract = await getAbstractDetailsForReviewer(id);

  return (
    <>
      <ReviewerHeader menuName="Review Desk" menuText="Abstract Review" />
      <div className="flex-1 overflow-y-auto p-4 md:p-12 custom-scrollbar bg-slate-50/30">
        <div className="relative overflow-hidden">
          <AbstractReviewForm
            user={user}
            abstract={abstract.data}
            criteria={criteriaByType}
          />
        </div>
      </div>
    </>
  );
};

export default AbstractReviewPage;
