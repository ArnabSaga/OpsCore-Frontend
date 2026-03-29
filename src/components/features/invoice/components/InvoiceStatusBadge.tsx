import type {
  InvoiceListItem,
  InvoiceStatus,
} from "@/components/features/invoice/types/invoice.types";
import { getDisplayInvoiceStatus } from "@/components/features/invoice/utils/invoice-display";
import { cn } from "@/lib/utils";

type InvoiceStatusBadgeProps = {
  status?: InvoiceStatus;
  invoice?: Pick<InvoiceListItem, "status" | "dueAt">;
};

const statusStyles: Record<InvoiceStatus, string> = {
  PENDING: "border-amber-400/20 bg-amber-400/10 text-amber-200",
  PAID: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
  OVERDUE: "border-red-400/20 bg-red-400/10 text-red-200",
  CANCELED: "border-slate-400/20 bg-slate-400/10 text-slate-200",
};

const InvoiceStatusBadge = ({ status, invoice }: InvoiceStatusBadgeProps) => {
  const resolvedStatus = invoice ? getDisplayInvoiceStatus(invoice) : (status ?? "PENDING");

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em]",
        statusStyles[resolvedStatus]
      )}
    >
      {resolvedStatus}
    </span>
  );
};

export default InvoiceStatusBadge;
