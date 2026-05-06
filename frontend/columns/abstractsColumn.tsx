"use client";
import { Button } from "@/components/button";
import { AbstractTableRow } from "@/lib/type";
import { capitalize } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const getAbstractsColumn = (): ColumnDef<AbstractTableRow>[] => [
  {
    header: "#",
    accessorKey: "index",
    cell: ({ row }) => row.index + 1,
  },
  {
    id: "title",
    accessorKey: "title",
    cell: ({ row }) => capitalize(row.original.title || ""),
    header: ({ column }) => {
      return (
        <Button
          className="text-sm md:text-md font-bold uppercase"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    id: "topic",
    accessorKey: "topic",
    cell: ({ row }) => capitalize(row.original.topic || ""),
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
  },
  {
    id: "status",
    accessorKey: "status",
    cell: ({ row }) => capitalize(row.original.status || ""),
    header: ({ column }) => {
      return (
        <Button
          className="text-sm md:text-md font-bold uppercase"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "co_authors",
    accessorKey: "coAuthors",
    cell: ({ row }) => {
      const authors = row.original.coAuthors;

      if (!authors.length) return "-";

      return (
        <div className="flex flex-col gap-1 text-center">
          {authors.map((a, i) => (
            <div key={i}>
              <p className="text-sm font-medium">{a.name}</p>
              <p className="text-xs text-gray-400">{a.email}</p>
            </div>
          ))}
        </div>
      );
    },

    header: ({ column }) => {
      return (
        <Button
          className="text-sm md:text-md font-bold uppercase"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Co Authors
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "coAuthors",
    accessorKey: "coAuthors",
    cell: ({ row }) => {
      const reviewers = row.original.reviewers;

      if (!reviewers.length) return "-";

      return (
        <div className="flex flex-col gap-2 text-center">
          {reviewers.map((r, i) => (
            <div key={i}>
              <p className="text-sm font-medium">{r.name}</p>
              <p className="text-xs text-gray-400">{r.email}</p>
            </div>
          ))}
        </div>
      );
    },
    header: ({ column }) => {
      return (
        <Button
          className="text-sm md:text-md font-bold uppercase"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Reviewers
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];
