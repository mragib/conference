import AbstractDetails from "@/components/AbstractDetails";
import AdminHeader from "@/components/AdminHeader";
import { getAbstractDetailsForAdmin } from "@/lib/data-service";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

const AbstractDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const {
    data: abstract,
    success,
    errors,
  } = await getAbstractDetailsForAdmin(id);

  const { user } = await getSession();

  if (!user) redirect("/signin");

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
      <AdminHeader menuName="Abstract Details" />
      <AbstractDetails abstract={abstract} user={user} />
    </>
  );
};

export default AbstractDetailPage;
