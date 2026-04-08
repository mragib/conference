"use client";
import { getUserColumns } from "@/columns/usersColumn";
import DataTable from "@/components/DataTable";
import { REVEIWER_USER, Topic } from "@/lib/type";

const UserTable = ({
  users,
  topics,
}: {
  users: REVEIWER_USER[];
  topics: Topic[];
}) => {
  const columns = getUserColumns(topics);
  return <DataTable columns={columns} data={users} />;
};

export default UserTable;
