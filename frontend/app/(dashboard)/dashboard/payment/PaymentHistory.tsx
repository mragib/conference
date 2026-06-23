import { formatDateTime } from "@/lib/utils";

const PaymentHistoryTable = ({ payments }) => {
  return (
    <div className="my-8 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-200">
        <h2 className="text-lg font-black text-[#003366] uppercase tracking-wide">
          Payment History
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-500">
                Payment Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-500">
                Category
              </th>
              <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-500">
                Registration Type
              </th>
              <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-500">
                Partecipant Group
              </th>
              <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-500">
                Amount
              </th>
              <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-500">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-500">
                Transaction ID
              </th>
            </tr>
          </thead>

          <tbody>
            {payments?.length ? (
              payments.map((payment) => (
                <tr
                  key={payment.id}
                  className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {formatDateTime(payment.created_at)}
                  </td>

                  <td className="px-6 py-4">
                    <span className="font-semibold text-[#003366]">
                      {payment.registration_fee.registration_category.replaceAll(
                        "_",
                        " ",
                      )}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-700">
                    {payment.transaction.registration_type}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-700">
                    {payment.registration_fee.user_type}
                  </td>
                  <td className="px-6 py-4 font-bold text-[#003366]">
                    {payment.amount}{" "}
                    {payment.registration_fee.country_type === "LOCAL"
                      ? "BDT"
                      : "USD"}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase
                    ${
                      payment.status === "SUCCESS"
                        ? "bg-green-100 text-green-700"
                        : payment.status === "FAILED"
                          ? "bg-red-100 text-red-700"
                          : payment.status === "CANCEL"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-slate-100 text-slate-700"
                    }`}
                    >
                      {payment.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-xs text-slate-500 font-mono">
                    {payment.transaction.id}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-12 text-center text-slate-500"
                >
                  No payment history found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistoryTable;
