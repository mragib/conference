import { CheckCircle, Clock, Eye, FileText, XCircle } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function ReviewerStatsCard({ data }) {
  const stats = [
    {
      label: "Assigned",
      value: data.total_assigned ?? 0,
      icon: FileText,
      color: "text-blue-500",
    },
    {
      label: "Agreed",
      value: data.total_agreed ?? 0,
      icon: CheckCircle,
      color: "text-green-500",
    },
    {
      label: "Undecided",
      value: data.total_pending ?? 0,
      icon: Clock,
      color: "text-yellow-500",
    },
    {
      label: "Declined",
      value: data.total_declined ?? 0,
      icon: XCircle,
      color: "text-red-500",
    },
    {
      label: "Reviewed",
      value: data.total_reviewed ?? 0,
      icon: Eye,
      color: "text-purple-500",
    },
  ];

  return (
    <Card className="h-full max-w-xl bg-amber-100">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">
          Reviewer Statistics
        </CardTitle>

        <Eye className="h-4 w-4 text-muted-foreground" />
      </CardHeader>

      <CardContent>
        <div className="space-y-2">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <stat.icon className={`h-4 w-4 ${stat.color}`} />

                <span className="text-sm text-muted-foreground">
                  {stat.label}
                </span>
              </div>

              <span className="text-lg font-bold">{stat.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
