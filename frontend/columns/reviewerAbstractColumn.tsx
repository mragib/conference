import { Button } from "@/components/button";
import { Badge } from "@/components/ui/badge";
import { ReviewerAbstractType } from "@/lib/type";
import { capitalize, formatDateTime } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const getReviewerAbstractColumn =
  (): ColumnDef<ReviewerAbstractType>[] => [
    {
      header: "#",
      accessorKey: "index",
      cell: ({ row }) => row.index + 1,
    },
    {
      id: "title",
      accessorKey: "title",
      cell: ({ row }) => capitalize(row.original.abstract.title || ""),
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
      id: "acknowledge_date",
      accessorKey: "acknowledge_date",
      cell: ({ row }) => formatDateTime(row.original.acknowledge_date),
      header: ({ column }) => {
        return (
          <Button
            className="text-sm md:text-md font-bold uppercase"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Acknowledge Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      id: "assign_date",
      accessorKey: "assign_date",
      cell: ({ row }) => formatDateTime(row.original.assign_date),

      header: ({ column }) => {
        return (
          <Button
            className="text-sm md:text-md font-bold uppercase"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Assign Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },

    {
      id: "status",
      accessorKey: "status",
      cell: ({ row }) => {
        const status = row.original.is_agreed;

        if (status === null || status === undefined) {
          return <Badge variant="secondary">Pending</Badge>;
        }

        if (status === true) {
          return (
            <Badge className="bg-green-500 hover:bg-green-600">Accepted</Badge>
          );
        }

        return <Badge variant="destructive">Rejected</Badge>;
      },
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
  ];
