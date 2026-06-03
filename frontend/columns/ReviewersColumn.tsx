"use client";

import ReviewerRow from "@/app/(admin)/admin/reviewers/ReviewerRow";
import { Button } from "@/components/button";
import { Badge } from "@/components/ui/badge";
import { REVIEWER_TYPE_FOR_TABLE } from "@/lib/type";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, CheckCircle2, Clock3, XCircle } from "lucide-react";

export const getReviewerColumns = (): ColumnDef<REVIEWER_TYPE_FOR_TABLE>[] => [
  {
    header: "#",
    accessorKey: "index",
    cell: ({ row }) => row.index + 1,
  },
  {
    id: "name",
    accessorKey: "name",
    cell: ({ row }) => {
      return (
        <p className="capitalize text-left font-medium">{row.original.name}</p>
      );
    },
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
    cell: ({ row }) => row.original.email || "",
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
    id: "is_active",
    accessorKey: "is_active",
    cell: ({ row }) => {
      const status = row.original.is_active;

      if (status) {
        return (
          <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>
        );
      }

      return <Badge variant="destructive">Inactive</Badge>;
    },
    header: ({ column }) => {
      return (
        <Button
          className="text-sm md:text-md font-bold uppercase"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          User Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "abstract_status",

    cell: ({ row }) => {
      const { total_agreed, total_declined, total_pending } = row.original;

      return (
        <div className="flex flex-col gap-2 items-center">
          <Badge className="justify-start gap-2 bg-green-500 hover:bg-green-600">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Agreed: {total_agreed}
          </Badge>

          <Badge className="justify-start gap-2 bg-yellow-500 hover:bg-yellow-600 text-black">
            <Clock3 className="h-3.5 w-3.5" />
            Pending: {total_pending}
          </Badge>

          <Badge variant="destructive" className="justify-start gap-2">
            <XCircle className="h-3.5 w-3.5" />
            Declined: {total_declined}
          </Badge>
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
          Abstract Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "display_order",
    accessorKey: "display_order",
    header: ({ column }) => {
      return (
        <Button
          className="text-sm md:text-md font-bold uppercase"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Order
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "review_status",

    cell: ({ row }) => {
      const { total_agreed, total_reviewed } = row.original;

      const reviewPending = Number(total_agreed) - Number(total_reviewed);

      return (
        <div className="flex flex-col gap-2 items-center">
          <p className="justify-start text-xs gap-2 bg-slate-500 hover:bg-slate-600 text-white px-2 py-1 rounded">
            Total Review: {total_agreed}
          </p>

          <p className="justify-start text-xs gap-2 bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded">
            Completed: {total_reviewed}
          </p>

          <p className="justify-start gap-2 bg-orange-500 hover:bg-orange-600 text-white px-2 py-1 rounded text-xs">
            Pending: {reviewPending}
          </p>
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
          Review Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const data = row.original;
      return <ReviewerRow reviewer={data} />;
    },
  },
];
