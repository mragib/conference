"use client";
import AbstractRow from "@/app/(admin)/admin/abstracts/AbstractRow";
import { Button } from "@/components/button";
import { Badge } from "@/components/ui/badge";
import { AbstractTableRow, REVEIWER_USER_TYPE } from "@/lib/type";
import { capitalize } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";

export const getAbstractsColumn = (
  reviewers: REVEIWER_USER_TYPE[],
): ColumnDef<AbstractTableRow>[] => [
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
          href="#"
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
      <div className="max-w-xl text-left">
        <p className="line-clamp-2 whitespace-normal overflow-hidden wrap-break-words text-sm leading-6">
          {capitalize(row.original.topic || "")}
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
          Sub Themes
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "status",
    accessorKey: "status",

    cell: ({ row }) => {
      const status = row.original.status;

      const statusStyles = {
        pending:
          "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-50",
        accepted:
          "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50",
        rejected: "border-red-200 bg-red-50 text-red-700 hover:bg-red-50",
      };

      const dotStyles = {
        pending: "bg-amber-500",
        accepted: "bg-emerald-500",
        rejected: "bg-red-500",
      };

      return (
        <div className="flex items-center justify-center">
          <Badge
            variant="outline"
            className={`gap-1.5 px-3 py-1 rounded-full font-semibold capitalize
            ${statusStyles[status as keyof typeof statusStyles]}`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                dotStyles[status as keyof typeof dotStyles]
              }`}
            />

            {status}
          </Badge>
        </div>
      );
    },

    header: ({ column }) => {
      return (
        <Button
          className="group px-0 hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="text-sm md:text-md font-bold uppercase tracking-wide text-slate-700">
            Abstract Status
          </span>

          <ArrowUpDown className="ml-2 h-4 w-4 text-slate-500 transition group-hover:text-slate-700" />
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
          Authors
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "reviewers",
    accessorKey: "reviewers",
    cell: ({ row }) => {
      const reviewers = row.original.reviewers;

      if (!reviewers.length) return "-";

      return (
        <div className="flex flex-col gap-2 text-center">
          {reviewers.map((r, i) => {
            return (
              <div key={i}>
                <p
                  className={`text-sm font-medium ${r.is_agreed === true ? "text-green-900" : r.is_agreed === null ? "text-yellow-900" : "text-red-900"}`}
                >
                  {r.name}
                </p>
                <p
                  className={`text-xs ${r.is_agreed === true ? "text-green-700" : r.is_agreed === null ? "text-yellow-700" : "text-red-700"}`}
                >
                  {r.is_agreed === true
                    ? "Agreed"
                    : r.is_agreed === null
                      ? "Undecided"
                      : "Declined"}
                </p>
                <p className="text-xs text-gray-400">{r.email}</p>
              </div>
            );
          })}
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
  {
    id: "Review Status",
    accessorKey: "has_review",

    cell: ({ row }) => {
      const reviewed = row.original.has_review;

      return (
        <div className="flex items-center justify-center">
          <Badge
            variant="outline"
            className={`gap-1.5 px-3 py-1 text-xs font-semibold rounded-full
            ${
              reviewed
                ? "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50"
                : "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-50"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                reviewed ? "bg-emerald-500" : "bg-amber-500"
              }`}
            />

            {reviewed ? "Done" : "Not Done"}
          </Badge>
        </div>
      );
    },

    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="group px-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Review Status
          </span>

          <ArrowUpDown className="ml-2 h-4 w-4 text-slate-500 transition group-hover:text-slate-700" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <AbstractRow
          abstract={data}
          reviewers={reviewers}
          review_status={row.original.has_review}
        />
      );
    },
  },
];
