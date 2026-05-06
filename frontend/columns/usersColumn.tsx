"use client";

import UserRow from "@/app/(admin)/admin/users/UserRow";
import { Button } from "@/components/button";
import { User } from "@/lib/type";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const getUserColumns = (): ColumnDef<User>[] => [
  {
    header: "#",
    accessorKey: "index",
    cell: ({ row }) => row.index + 1,
  },
  {
    id: "name",
    accessorKey: "name",
    cell: ({ row }) => (
      <div className="flex items-start text-left gap-4">
        <div>
          <p className="text-[#003366] text-sm font-bold capitalize">
            {row.original.name}
          </p>
          <p className="text-[12px] text-slate-400 font-medium">
            {row.original.email}
          </p>
          <p className="text-[12px] text-slate-400 font-medium">
            {row.original.profile?.contact_number}
          </p>
        </div>
      </div>
    ),
    header: ({ column }) => {
      return (
        <Button
          className="text-sm md:text-md font-bold uppercase"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    id: "role",
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button
          className="text-sm md:text-md font-bold uppercase"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Role
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    id: "designation",
    accessorKey: "designation",
    cell: ({ row }) => row.original.profile?.designation,
    header: ({ column }) => {
      return (
        <Button
          className="text-sm md:text-md font-bold uppercase"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Designation
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "organization",
    accessorKey: "organization",
    cell: ({ row }) => row.original.profile?.organization,
    header: ({ column }) => {
      return (
        <Button
          className="text-sm md:text-md font-bold uppercase"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Organization
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "country",
    accessorKey: "country",
    cell: ({ row }) => row.original.profile?.country,
    header: ({ column }) => {
      return (
        <Button
          className="text-sm md:text-md font-bold uppercase"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Country
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const data = row.original;
      return <UserRow user={data} />;
    },
  },
];
