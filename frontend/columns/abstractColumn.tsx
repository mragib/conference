import { Button } from "@/components/button";
import { AbstractType } from "@/lib/type";
import { capitalize } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const getAbstractColumns = (): ColumnDef<AbstractType>[] => [
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
    id: "purpose",
    accessorKey: "purpose",
    cell: ({ row }) => capitalize(row.original.purpose || ""),
    header: ({ column }) => {
      return (
        <Button
          className="text-sm md:text-md font-bold uppercase"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Purpose
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "methodology",
    accessorKey: "methodology",
    cell: ({ row }) => capitalize(row.original.methodology || ""),
    header: ({ column }) => {
      return (
        <Button
          className="text-sm md:text-md font-bold uppercase"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Methodology
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "findings",
    accessorKey: "findings",
    cell: ({ row }) => capitalize(row.original.findings || ""),
    header: ({ column }) => {
      return (
        <Button
          className="text-sm md:text-md font-bold uppercase"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Findings
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];
