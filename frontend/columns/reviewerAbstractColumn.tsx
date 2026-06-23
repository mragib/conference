import ReviewAbstractRow from "@/app/(reviewer)/reviewer/abstracts/ReviewAbstractRow";
import { Button } from "@/components/button";
import { Badge } from "@/components/ui/badge";
import { ReviewerAbstractType } from "@/lib/type";
import { capitalize, formatDateTime } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";

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
      cell: ({ row }) => (
        <div className="max-w-xl text-left">
          {row.original.is_agreed ? (
            <Link
              href={`/reviewer/abstracts/${row.original.abstract.id}`}
              // href="#"
              className="line-clamp-2 whitespace-normal overflow-hidden wrap-break-words text-sm leading-6 underline text-blue-800"
            >
              {capitalize(row.original.abstract.title || "")}
            </Link>
          ) : (
            <p className="line-clamp-2 whitespace-normal overflow-hidden wrap-break-words text-sm leading-6">
              {capitalize(row.original.abstract.title || "")}
            </p>
          )}
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
      id: "acknowledge_date",
      accessorKey: "acknowledge_date",
      cell: ({ row }) => {
        const status = row.original.is_agreed;
        const date = formatDateTime(row.original.acknowledge_date);
        if (status === null || status === undefined) {
          return (
            <div>
              <Badge variant="secondary">Pending</Badge>
            </div>
          );
        }

        if (status === true) {
          return (
            <div className="grid items-center justify-center gap-2">
              <div>
                <Badge className="bg-green-500 hover:bg-green-600">
                  Accepted
                </Badge>
              </div>
              <p className="text-xs text-slate-400">{date}</p>
            </div>
          );
        }

        return (
          <div className="grid items-center justify-center gap-2">
            <div>
              <Badge variant="destructive">Rejected</Badge>
            </div>
            <p className="text-xs text-slate-400">{date}</p>
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
            Acknowledgement
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
      id: "Review Status",
      accessorKey: "has_review",

      cell: ({ row }) => {
        const reviewed = row.original.abstract.status.name;

        return (
          <div className="flex items-center justify-center">
            <Badge
              variant="outline"
              className={`gap-1.5 px-3 py-1 text-xs font-semibold rounded-full capitalize
            ${
              reviewed === "reviewed"
                ? "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50"
                : reviewed === "accepted"
                  ? "border-green-200 bg-green-50 text-green-700 hover:bg-green-50"
                  : reviewed === "rejected"
                    ? "border-red-200 bg-red-50 text-red-700 hover:bg-red-50"
                    : "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-50"
            }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  reviewed === "reviewed" ? "bg-emerald-500" : "bg-amber-500"
                }`}
              />

              {reviewed ? reviewed : "Not Done"}
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
        return data.is_agreed ||
          data.is_agreed === null ||
          data.is_agreed === undefined ? (
          <ReviewAbstractRow abstractAssign={data} />
        ) : null;
      },
    },
  ];
