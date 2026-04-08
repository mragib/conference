"use client";

import UserRow from "@/app/(admin)/admin/users/UserRow";
import { Button } from "@/components/button";
import { Badge } from "@/components/ui/badge";
import { REVEIWER_USER, Topic } from "@/lib/type";
import { capitalize } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const getUserColumns = (topics: Topic[]): ColumnDef<REVEIWER_USER>[] => [
  {
    header: "#",
    accessorKey: "index",
    cell: ({ row }) => row.index + 1,
  },
  {
    id: "name",
    accessorKey: "name",
    cell: ({ row }) => capitalize(row.original.name || ""),
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
    id: "email",
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          className="text-sm md:text-md font-bold uppercase"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
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
    id: "topic",
    accessorKey: "topic",
    header: ({ column }) => {
      return (
        <Button
          className="text-sm md:text-md font-bold uppercase"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Topic
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const topics = row.getValue("topic") as { id: string; name: string }[];

      if (!topics || topics.length === 0)
        return <span className="text-muted-foreground">No Topics</span>;

      // Option A: Simple comma-separated string
      //   return <span>{topics.map((t) => t.name).join(", ")}</span>;

      // Option B: If you want nice UI Badges (assuming you have a Badge component)
      return (
        <div className="flex flex-wrap gap-1">
          {topics.map((t) => (
            <Badge
              key={t.id}
              variant="secondary"
              className="cursor-pointer text-xs"
            >
              {t.name}
            </Badge>
          ))}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const data = row.original;
      return <UserRow topics={topics} user={data} />;
    },
  },
];
