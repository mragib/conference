import AdminHeader from "@/components/AdminHeader";
import { getUsers } from "@/lib/data-service";
import { AddUser } from "./AddUser";
import UserTable from "./UserTable";

const UsersPage = async () => {
  const { data: users } = await getUsers();
  // const { data: topics } = await getTopics();

  const formattedData = users.map((user, index) => ({
    ...user,
    index,
    designation: user.profile?.designation ?? "",
    organization: user.profile?.organization ?? "",
    country: user.profile?.country ?? "",
  }));

  return (
    <>
      <AdminHeader menuName="User Management" />
      <div className="p-4">
        <AddUser />
      </div>
      <UserTable users={formattedData} />
    </>
  );
};

export default UsersPage;
