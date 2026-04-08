import AdminHeader from "@/components/AdminHeader";
import { getTopics, getUserWithTopic } from "@/lib/data-service";
import { AddUser } from "./AddUser";
import UserTable from "./UserTable";

const UsersPage = async () => {
  const { data: users } = await getUserWithTopic();
  const { data: topics } = await getTopics();

  return (
    <>
      <AdminHeader menuName="User Management" />
      <div className="p-4">
        <AddUser topics={topics} />
      </div>
      <UserTable topics={topics} users={users} />
    </>
  );
};

export default UsersPage;
