import SubscriptionStatusBadge from "@/components/features/billing/components/SubscriptionStatusBadge";
import type { BillingHistoryItem } from "@/components/features/billing/types/billing.types";
import { Button } from "@/components/ui/button";

type BillingHistoryRowCardProps = {
  invoice: BillingHistoryItem;
};

const formatDate = (value: string | null) => {
  if (!value) return "—";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
};

const BillingHistoryRowCard = ({ invoice }: BillingHistoryRowCardProps) => {
  return (
    <article className="rounded-[24px] border border-white/10 bg-[#101828]/85 p-5 shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-base font-semibold text-white">{invoice.invoiceNumber || "Invoice"}</p>
          <p className="mt-1 text-sm text-[#94A3B8]">
            {invoice.currency} {invoice.totalAmount}
          </p>
        </div>

        <SubscriptionStatusBadge status={invoice.status} />
      </div>

      <div className="mt-5 grid gap-3 text-sm text-[#94A3B8] sm:grid-cols-2">
        <div>
          <p>Issued</p>
          <p className="mt-1 font-medium text-white">{formatDate(invoice.issuedAt)}</p>
        </div>

        <div>
          <p>Paid</p>
          <p className="mt-1 font-medium text-white">{formatDate(invoice.paidAt)}</p>
        </div>
      </div>

      {invoice.hostedInvoiceUrl ? (
        <div className="mt-5 flex justify-end">
          <Button
            asChild
            variant="outline"
            className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
          >
            <a href={invoice.hostedInvoiceUrl} target="_blank" rel="noreferrer">
              Open invoice
            </a>
          </Button>
        </div>
      ) : null}
    </article>
  );
};

export default BillingHistoryRowCard;
