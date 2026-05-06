import AdminHeader from "@/components/AdminHeader";
import { getAllAbstracts } from "@/lib/data-service";
import AbstractsTable from "./AbstractsTable";

const AbstractPage = async () => {
  const { data } = await getAllAbstracts();

  const formattedData = data.map((a) => ({
    id: a.id,
    title: a.title,

    topic: a.topic?.name ?? "",
    status: a.status?.name ?? "",

    coAuthors:
      a.co_authors?.map((c) => ({
        name: `${c.first_name} ${c.last_name}`,
        email: c.email,
      })) ?? [],

    reviewers: a.reviewers ?? [], // already clean ✅

    _raw: {
      assigns: a.assigns, // keep if needed
    },
  }));

  return (
    <>
      <AdminHeader menuName="Abstract Management" />
      {/* <div className="p-4">{<AddReviewer />}</div>
      <ReviewerTable reviewers={reviewers} /> */}
      <AbstractsTable abstracts={formattedData} />
    </>
  );
};

export default AbstractPage;
