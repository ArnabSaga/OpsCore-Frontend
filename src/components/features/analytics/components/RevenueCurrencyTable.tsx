import AnalyticsSectionCard from "@/components/features/analytics/components/AnalyticsSectionCard";
import RevenueCurrencyCard from "@/components/features/analytics/components/RevenueCurrencyCard";
import type { RevenueTotalsByCurrency } from "@/components/features/analytics/types/analytics.types";

type RevenueCurrencyTableProps = {
  items: RevenueTotalsByCurrency[];
};

const RevenueCurrencyTable = ({ items }: RevenueCurrencyTableProps) => {
  return (
    <AnalyticsSectionCard
      title="Currency breakdown"
      description="Per-currency issued, collected, outstanding, and overdue totals."
    >
      {items.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-10 text-center text-sm text-[#94A3B8]">
          No currency totals available for this range.
        </div>
      ) : (
        <>
          <div className="hidden xl:block overflow-x-auto">
            <table className="min-w-full text-left text-sm text-[#94A3B8]">
              <thead className="bg-white/5 text-xs uppercase tracking-[0.14em] text-[#667085]">
                <tr>
                  <th className="px-5 py-4">Currency</th>
                  <th className="px-5 py-4">Invoices</th>
                  <th className="px-5 py-4">Issued</th>
                  <th className="px-5 py-4">Collected</th>
                  <th className="px-5 py-4">Outstanding</th>
                  <th className="px-5 py-4">Overdue</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.currency} className="border-t border-white/10">
                    <td className="px-5 py-4 font-medium text-white">{item.currency}</td>
                    <td className="px-5 py-4">{item.invoiceCount}</td>
                    <td className="px-5 py-4">{item.issuedAmount}</td>
                    <td className="px-5 py-4">{item.collectedAmount}</td>
                    <td className="px-5 py-4">{item.outstandingAmount}</td>
                    <td className="px-5 py-4">{item.overdueAmount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid gap-4 xl:hidden">
            {items.map((item) => (
              <RevenueCurrencyCard key={item.currency} item={item} />
            ))}
          </div>
        </>
      )}
    </AnalyticsSectionCard>
  );
};

export default RevenueCurrencyTable;
