import { CheckCircle2, Clock3, CreditCard } from "lucide-react";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function PaymentStatsCard({ data }) {
  const hasPayment = data.length > 0;

  const totalPaid = data.reduce((sum, item) => sum + Number(item.amount), 0);

  return (
    <Card
      className={`h-full max-w-xl ${hasPayment ? "bg-green-100" : "bg-red-100"}`}
    >
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Registration Payment</CardTitle>

        {hasPayment ? (
          <Badge className="bg-green-100 text-green-700 border-green-200">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Paid
          </Badge>
        ) : (
          <Badge variant="destructive">
            <Clock3 className="h-3 w-3 mr-1" />
            Unpaid
          </Badge>
        )}
      </CardHeader>

      <CardContent>
        {hasPayment ? (
          <div className="space-y-4">
            <div className="rounded-lg border bg-green-50 p-4">
              <p className="text-sm text-muted-foreground">Total Paid</p>

              <p className="text-3xl font-bold text-green-600">
                {data[0].currency} {totalPaid.toFixed(2)}
              </p>
            </div>

            <div className="space-y-3">
              {data.map((payment, index) => (
                <div key={index} className="rounded-lg border p-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Registration Type
                    </span>
                    <span className="font-medium">
                      {payment.registrationType}
                    </span>
                  </div>

                  <div className="flex justify-between mt-2">
                    <span className="text-muted-foreground">Category</span>
                    <span className="font-medium">
                      {payment.registrationCategory.replace("_", " ")}
                    </span>
                  </div>

                  <div className="flex justify-between mt-2">
                    <span className="text-muted-foreground">Amount</span>
                    <span className="font-semibold">
                      {payment.currency} {payment.amount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="mb-4 rounded-full bg-amber-100 p-4">
              <CreditCard className="h-8 w-8 text-amber-600" />
            </div>

            <Badge variant="secondary" className="mb-3">
              Payment Pending
            </Badge>

            <p className="font-semibold">Registration payment required</p>

            <p className="mt-1 text-sm text-muted-foreground max-w-xs">
              Complete your payment to finalize your conference registration.
            </p>

            <Button asChild className="mt-5">
              <Link href="/dashboard/payment">Pay Now</Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
