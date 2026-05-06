"use client";
import { getUserColumns } from "@/columns/usersColumn";
import DataTable from "@/components/DataTable";
import { User } from "@/lib/type";

const UserTable = ({ users }: { users: User[] }) => {
  const columns = getUserColumns();
  return <DataTable columns={columns} data={users} />;
};

export default UserTable;
