import AdminHeader from "@/components/AdminHeader";
import { getTopics } from "@/lib/data-service";

const SubThemePage = async () => {
  const { data } = await getTopics();

  return (
    <>
      <AdminHeader menuName="sub theme" />
    </>
  );
};

export default SubThemePage;
