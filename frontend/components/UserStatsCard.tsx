import { Shield, UserCheck, UserCog, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function UserStatsCard({ data }) {
  const stats = [
    {
      label: "Total Users",
      value: data.total,
      icon: Users,
      color: "text-blue-500",
    },
    {
      label: "Researchers",
      value: data.researchers,
      icon: UserCheck,
      color: "text-green-500",
    },
    {
      label: "Reviewers",
      value: data.reviewers,
      icon: Shield,
      color: "text-purple-500",
    },
    {
      label: "Admins",
      value: data.admins,
      icon: UserCog,
      color: "text-red-500",
    },
  ];

  return (
    <Card className="h-full max-w-xl bg-olive-100">
      <CardHeader>
        <CardTitle>Users</CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-muted/30"
          >
            <div className="flex items-center gap-3">
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
              <span className="text-sm text-muted-foreground">
                {stat.label}
              </span>
            </div>

            <span className="font-bold">{stat.value}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
