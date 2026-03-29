import { CalendarClock, Mail, ReceiptText, User2 } from "lucide-react";
import Link from "next/link";

import InvoiceStatusBadge from "@/components/features/invoice/components/InvoiceStatusBadge";
import type { InvoiceListItem } from "@/components/features/invoice/types/invoice.types";
import {
  formatInvoiceDate,
  formatInvoiceMoney,
} from "@/components/features/invoice/utils/invoice-display";
import { Button } from "@/components/ui/button";

type InvoiceCardProps = {
  invoice: InvoiceListItem;
  onDelete?: (invoice: InvoiceListItem) => Promise<void> | void;
};

const InvoiceCard = ({ invoice, onDelete }: InvoiceCardProps) => {
  return (
    <article
      data-invoice-card
      className="rounded-[24px] border border-white/10 bg-[#101828]/85 p-5 shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-[#667085]">Invoice number</p>
          <h3 className="mt-2 text-lg font-semibold text-white">{invoice.invoiceNumber}</h3>
        </div>

        <InvoiceStatusBadge invoice={invoice} />
      </div>

      <div className="mt-5 grid gap-3 text-sm text-[#94A3B8]">
        <div className="flex items-center gap-2">
          <User2 className="h-4 w-4 text-[#CBB5FF]" />
          <span>{invoice.customerName || "Unnamed customer"}</span>
        </div>

        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-[#CBB5FF]" />
          <span>{invoice.customerEmail || "No customer email"}</span>
        </div>

        <div className="flex items-center gap-2">
          <CalendarClock className="h-4 w-4 text-[#CBB5FF]" />
          <span>Due {formatInvoiceDate(invoice.dueAt, "No due date")}</span>
        </div>

        <div className="flex items-center gap-2">
          <ReceiptText className="h-4 w-4 text-[#CBB5FF]" />
          <span>{invoice._count.items} line item(s)</span>
        </div>
      </div>

      <div className="mt-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-[#667085]">Amount</p>
          <p className="mt-2 text-2xl font-semibold text-white">
            {formatInvoiceMoney(invoice.amount, invoice.currency)}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            asChild
            variant="outline"
            className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
          >
            <Link href={`/invoices/${invoice.id}`}>Open</Link>
          </Button>

          <Button asChild className="rounded-xl bg-[#7F56D9] text-white hover:bg-[#6941C6]">
            <Link href={`/invoices/${invoice.id}/preview`}>Preview</Link>
          </Button>

          {onDelete ? (
            <Button
              type="button"
              variant="outline"
              onClick={() => void onDelete(invoice)}
              className="rounded-xl border-red-500/20 bg-red-500/10 text-red-200 hover:bg-red-500/20"
            >
              Delete
            </Button>
          ) : null}
        </div>
      </div>
    </article>
  );
};

export default InvoiceCard;
