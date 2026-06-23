import { Button } from "@/components/button";
import { Badge } from "@/components/ui/badge";
import { AbstractType } from "@/lib/type";
import { capitalize, formatDateTime } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  CheckCircle2,
  Clock3,
  Eye,
  Save,
  XCircle,
} from "lucide-react";
import Link from "next/link";

export const getAbstractColumns = (url: string): ColumnDef<AbstractType>[] => [
  {
    header: "#",
    accessorKey: "index",
    cell: ({ row }) => row.index + 1,
  },
  {
    id: "title",
    accessorKey: "title",
    cell: ({ row }) => (
      <div className="max-w-xl text-left">
        <Link
          href={`${url}/${row.original.id}`}
          className="line-clamp-2 whitespace-normal overflow-hidden wrap-break-words text-sm leading-6 underline text-blue-800"
        >
          {capitalize(row.original.title || "")}
        </Link>
      </div>
    ),
    header: ({ column }) => {
      return (
        <Button
          className="text-sm md:text-md font-bold uppercase text-left"
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
    cell: ({ row }) => (
      <div className="max-w-2xl text-left">
        <p className="line-clamp-2 whitespace-normal overflow-hidden wrap-break-words text-sm leading-6">
          {capitalize(row.original.topic.name || "")}
        </p>
      </div>
    ),
    header: ({ column }) => {
      return (
        <Button
          className="text-sm md:text-md font-bold uppercase"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Sub Theme
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "submission_date",
    accessorKey: "submission_date",
    cell: ({ row }) => formatDateTime(row.original.created_at),
    header: ({ column }) => {
      return (
        <Button
          className="text-sm md:text-md font-bold uppercase"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Submission Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "status",
    accessorKey: "status",
    cell: ({ row }) => {
      const status = row.original.status?.name?.toLowerCase();

      const config = {
        pending: {
          icon: Clock3,
          className: "bg-amber-100 text-amber-800 border-amber-200",
        },
        accepted: {
          icon: CheckCircle2,
          className: "bg-emerald-100 text-emerald-800 border-emerald-200",
        },
        rejected: {
          icon: XCircle,
          className: "bg-red-100 text-red-800 border-red-200",
        },
        reviewed: {
          icon: Eye,
          className: "bg-blue-100 text-blue-800 border-blue-200",
        },
        saved: {
          icon: Save,
          className: "bg-slate-100 text-slate-800 border-slate-200",
        },
      };

      const item = config[status];
      const Icon = item?.icon;

      return (
        <div className="grid items-center justify-center">
          <Badge
            variant="outline"
            className={`capitalize flex justify-center w-fit items-center gap-1 ${item?.className}`}
          >
            {Icon && <Icon className="h-3 w-3" />}
            {status}
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
    id: "co_authors",
    accessorKey: "co_authors",
    cell: ({ row }) => {
      const authors = row.original.co_authors;

      if (!authors.length) return "-";

      return (
        <div className="flex flex-col gap-1 text-center">
          {authors.map((a, i) => (
            <div key={i}>
              <p className="text-sm font-medium">{`${a.first_name} ${a.last_name}`}</p>
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
          Authors
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];
