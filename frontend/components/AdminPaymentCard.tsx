import { Banknote, CreditCard, Globe, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function AdminPaymentCard({ data }) {
  const bdt = data.amountStats.find((item) => item.currency === "BDT");

  const usd = data.amountStats.find((item) => item.currency === "USD");

  const local = data.participantTypeStats?.find(
    (item) => item.participant_type === "LOCAL",
  );

  const international = data.participantTypeStats?.find(
    (item) => item.participant_type === "INTERNATIONAL",
  );

  const stats = [
    {
      label: "Participants",
      value: data.totalParticipants,
      icon: Users,
      color: "text-blue-500",
    },
    {
      label: "Local",
      value: local?.count ?? 0,
      icon: Users,
      color: "text-green-500",
    },
    {
      label: "International",
      value: international?.count ?? 0,
      icon: Globe,
      color: "text-purple-500",
    },
    {
      label: "BDT Collection",
      store: bdt?.amount ?? 0,
      value: bdt?.store_amount ?? 0,
      icon: Banknote,
      color: "text-emerald-500",
    },
    {
      label: "USD Collection",
      store: usd?.amount ?? 0,
      value: usd?.store_amount ?? 0,
      icon: CreditCard,
      color: "text-orange-500",
    },
  ];

  return (
    <Card className="h-full max-w-xl">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">
          Registration Statistics
        </CardTitle>

        <CreditCard className="h-4 w-4 text-muted-foreground" />
      </CardHeader>

      <CardContent className="space-y-2">
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
            <div>
              <p className="text-lg font-bold">{stat.value}</p>
              {stat.store && (
                <span className="text-sm text-muted-foreground">
                  {stat.store}
                </span>
              )}
            </div>
          </div>
        ))}

        <div className="pt-2 flex flex-wrap gap-2">
          {data.registrationTypeStats.map((item) => (
            <span
              key={item.registrationType}
              className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium"
            >
              {item.registrationType}: {item.count}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
