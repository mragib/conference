import AbstractDetails from "@/components/AbstractDetails";
import ReviewerHeader from "@/components/ReviewerHeader";
import { getAbstractDetailsForReviewer } from "@/lib/data-service";

const AbstractDetailsPageForReviewer = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const {
    data: abstract,
    success,
    errors,
  } = await getAbstractDetailsForReviewer(id);

  if (!success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
              Abstract Details
            </h1>
          </div>
          <div className="mt-8 p-6 bg-red-100 dark:bg-slate-800 rounded-lg shadow">
            <p className="text-red-600 dark:text-red-300">
              {errors ||
                "Failed to load abstract details. Please try again later."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <ReviewerHeader menuName="Review Desk" menuText="Abstract Details" />
      <AbstractDetails abstract={abstract} is_reviewer={true} />
    </>
  );
};

export default AbstractDetailsPageForReviewer;
