import { Eye } from "lucide-react";

export default function StatusCard({ statusId }: { statusId: number }) {
  const statusConfig = {
    1: {
      label: "Under Review",
      color:
        "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300",
      icon: Eye,
    },
    2: {
      label: "Approved",
      color:
        "bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300",
      icon: () => null,
    },
    3: {
      label: "Rejected",
      color: "bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300",
      icon: () => null,
    },
  };

  const config =
    statusConfig[statusId as keyof typeof statusConfig] || statusConfig[1];
  const StatusIcon = config.icon;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          Submission Status
        </h3>
        {StatusIcon && <StatusIcon className="w-4 h-4 text-slate-400" />}
      </div>
      <div
        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.color}`}
      >
        {config.label}
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
        Last updated: {new Date().toLocaleDateString()}
      </p>
    </div>
  );
}
