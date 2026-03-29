import BillingHistoryRowCard from "@/components/features/billing/components/BillingHistoryRowCard";
import type { BillingHistoryItem } from "@/components/features/billing/types/billing.types";
import { Button } from "@/components/ui/button";

type BillingHistoryTableProps = {
  invoices: BillingHistoryItem[];
  hasMore?: boolean;
  onLoadMore?: () => void;
  isLoadingMore?: boolean;
};

const formatDate = (value: string | null) => {
  if (!value) return "—";

  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(value));
  } catch {
    return "—";
  }
};

const BillingHistoryTable = ({
  invoices,
  hasMore = false,
  onLoadMore,
  isLoadingMore = false,
}: BillingHistoryTableProps) => {
  const invoiceItems = Array.isArray(invoices) ? invoices : [];

  return (
    <div className="rounded-[24px] border border-white/10 bg-[#101828]/85 p-6 shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <h2 className="text-lg font-semibold text-white">Billing history</h2>
      <p className="mt-1 text-sm text-[#94A3B8]">
        Stripe invoice history for the current workspace.
      </p>

      {invoiceItems.length === 0 ? (
        <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 px-4 py-10 text-center text-sm text-[#94A3B8]">
          No billing invoices available yet.
        </div>
      ) : (
        <>
          <div className="mt-5 hidden xl:block overflow-x-auto">
            <table className="min-w-full text-left text-sm text-[#94A3B8]">
              <thead className="bg-white/5 text-xs uppercase tracking-[0.14em] text-[#667085]">
                <tr>
                  <th className="px-5 py-4">Invoice</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Currency</th>
                  <th className="px-5 py-4">Total</th>
                  <th className="px-5 py-4">Issued</th>
                  <th className="px-5 py-4">Paid</th>
                  <th className="px-5 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {invoiceItems.map((invoice) => (
                  <tr key={invoice.id} className="border-t border-white/10">
                    <td className="px-5 py-4 font-medium text-white">
                      {invoice.invoiceNumber || "Invoice"}
                    </td>
                    <td className="px-5 py-4 capitalize">{invoice.status}</td>
                    <td className="px-5 py-4">{invoice.currency}</td>
                    <td className="px-5 py-4">{invoice.totalAmount}</td>
                    <td className="px-5 py-4">{formatDate(invoice.issuedAt)}</td>
                    <td className="px-5 py-4">{formatDate(invoice.paidAt)}</td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end">
                        {invoice.hostedInvoiceUrl ? (
                          <Button
                            asChild
                            variant="outline"
                            className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
                          >
                            <a href={invoice.hostedInvoiceUrl} target="_blank" rel="noreferrer">
                              Open
                            </a>
                          </Button>
                        ) : (
                          <span className="text-xs text-[#667085]">Unavailable</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5 grid gap-4 xl:hidden">
            {invoiceItems.map((invoice) => (
              <BillingHistoryRowCard key={invoice.id} invoice={invoice} />
            ))}
          </div>

          {hasMore && onLoadMore ? (
            <div className="mt-5 flex justify-end">
              <Button
                onClick={onLoadMore}
                disabled={isLoadingMore}
                variant="outline"
                className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
              >
                {isLoadingMore ? "Loading..." : "Load more"}
              </Button>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default BillingHistoryTable;
