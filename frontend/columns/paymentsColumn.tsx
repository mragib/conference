"use client";

import { Button } from "@/components/button";
import { Badge } from "@/components/ui/badge";
import { PAYMENT_TYPE_FOR_TABLE } from "@/lib/type";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, CheckCircle2, XCircle } from "lucide-react";
import Image from "next/image";

export const getPaymentColumns = (): ColumnDef<PAYMENT_TYPE_FOR_TABLE>[] => [
  {
    header: "#",
    id: "index",
    cell: ({ row }) => row.index + 1,
  },

  {
    id: "user_info",
    header: "User Information",
    accessorFn: (row) =>
      `${row.first_name} ${row.last_name} ${row.designation} ${row.organization}`,
    cell: ({ row }) => {
      const { first_name, last_name, designation, organization, country } =
        row.original;

      return (
        <div className="space-y-1 min-w-[220px] text-left">
          {(first_name || last_name) && (
            <div className="flex items-center gap-2">
              <p className="font-medium text-sm">
                {first_name} {last_name}
              </p>

              {country && (
                <Image
                  src={`https://flagcdn.com/w40/${country.toLowerCase()}.png`}
                  alt={country}
                  width={20}
                  height={15}
                  className="rounded-sm border"
                />
              )}
            </div>
          )}

          {(designation || organization) && (
            <p className="text-xs text-muted-foreground">
              {designation}
              {designation && organization && " • "}
              {organization}
            </p>
          )}
        </div>
      );
    },
  },

  {
    id: "contact",
    header: "Contact",
    accessorFn: (row) => `${row.email} ${row.contact_number ?? ""}`,
    cell: ({ row }) => {
      const { email, contact_number } = row.original;

      return (
        <div className="space-y-1 min-w-[220px] text-left">
          <p className="text-sm break-all">{email}</p>

          {contact_number && (
            <p className="text-xs text-muted-foreground">{contact_number}</p>
          )}
        </div>
      );
    },
  },

  {
    id: "registration",
    header: "Registration",
    accessorFn: (row) =>
      `${row.registration_type} ${row.registration_user_type} ${row.registration_category}`,
    cell: ({ row }) => (
      <div className="space-y-1">
        <Badge variant="outline">{row.original.registration_type}</Badge>

        <p className="text-xs text-muted-foreground">
          {row.original.registration_user_type}
        </p>
        <p className="text-xs text-muted-foreground">
          {row.original.registration_category}
        </p>
      </div>
    ),
  },

  {
    id: "amounts",
    header: "Amount",
    cell: ({ row }) => {
      const amount = Number(row.original.amount);
      const storeAmount = Number(row.original.store_amount);
      const currency = row.original.country === "BD" ? "BDT" : "USD";

      return (
        <div className="flex flex-col gap-1 min-w-[100px]">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500">Paid</span>
            <span className="font-semibold text-slate-900">
              {amount.toLocaleString()} {currency}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500">Store</span>
            <span className="font-semibold text-slate-700">
              {storeAmount.toLocaleString()} {currency}
            </span>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "status",
    id: "status",
    cell: ({ row }) => {
      const status = row.original.status;

      return status === "SUCCESS" ? (
        <Badge className="bg-green-500 hover:bg-green-600 gap-1">
          <CheckCircle2 className="h-3 w-3" />
          Success
        </Badge>
      ) : (
        <Badge variant="destructive" className="gap-1">
          <XCircle className="h-3 w-3" />
          {status}
        </Badge>
      );
    },
    header: "Status",
  },

  {
    id: "abstract",
    header: "Abstract",
    cell: ({ row }) => {
      const total = Number(row.original.total_abstract);
      const accepted = Number(row.original.accepted_abstract);
      const pending = total - accepted;

      return (
        <div className="flex flex-col items-center gap-1 min-w-[120px]">
          <Badge className="bg-slate-100 text-slate-700 justify-start">
            Total: {total}
          </Badge>

          <Badge className="bg-green-100 text-green-700 justify-start">
            Accepted: {accepted}
          </Badge>

          <Badge className="bg-yellow-100 text-yellow-700 justify-start">
            Pending: {pending}
          </Badge>
        </div>
      );
    },
  },

  {
    accessorKey: "created_at",
    id: "created_at",
    cell: ({ row }) => {
      const date = new Date(row.original.created_at);
      const diff = Date.now() - date.getTime();

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const days = Math.floor(hours / 24);

      return (
        <div className="text-sm min-w-[120px]">
          <p className="font-medium text-slate-800">
            {days > 0 ? `${days}d ago` : `${hours}h ago`}
          </p>
          <p className="text-xs text-slate-500">{date.toLocaleDateString()}</p>
        </div>
      );
    },
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Payment Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
];
