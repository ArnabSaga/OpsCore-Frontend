import { CalendarClock, FileText, Mail, ReceiptText, User2 } from "lucide-react";
import Link from "next/link";

import InvoiceStatusBadge from "@/components/features/invoice/components/InvoiceStatusBadge";
import type { InvoiceDetails } from "@/components/features/invoice/types/invoice.types";
import {
  formatInvoiceDate,
  formatInvoiceMoney,
} from "@/components/features/invoice/utils/invoice-display";
import { Button } from "@/components/ui/button";

type InvoiceDetailsHeroProps = {
  invoice: InvoiceDetails;
};

const InvoiceDetailsHero = ({ invoice }: InvoiceDetailsHeroProps) => {
  return (
    <section className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#101828] px-6 py-7 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl md:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(127,86,217,0.22),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(105,65,198,0.16),transparent_30%)]" />

      <div className="relative z-10 flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#7F56D9]/20 bg-[#7F56D9]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#CBB5FF]">
              <ReceiptText className="h-3.5 w-3.5" />
              Invoice details
            </div>
            <InvoiceStatusBadge invoice={invoice} />
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              {invoice.invoiceNumber}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#94A3B8] md:text-base">
              Review line items, billing context, and operational actions for this invoice.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-[#667085]">Amount</p>
              <p className="mt-2 text-xl font-semibold text-white">
                {formatInvoiceMoney(invoice.amount, invoice.currency)}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-[#667085]">Due date</p>
              <p className="mt-2 text-base font-semibold text-white">
                {formatInvoiceDate(invoice.dueAt, "No due date")}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-[#667085]">Customer</p>
              <p className="mt-2 text-base font-semibold text-white">
                {invoice.customerName || "Unnamed customer"}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-[#667085]">Items</p>
              <p className="mt-2 text-base font-semibold text-white">{invoice.items.length}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:w-[360px]">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-[#94A3B8]">
            <div className="flex items-center gap-2">
              <User2 className="h-4 w-4 text-[#CBB5FF]" />
              <span>{invoice.customerName || "No customer name"}</span>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <Mail className="h-4 w-4 text-[#CBB5FF]" />
              <span>{invoice.customerEmail || "No customer email"}</span>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <CalendarClock className="h-4 w-4 text-[#CBB5FF]" />
              <span>Issued {formatInvoiceDate(invoice.issuedAt, "Not issued")}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              asChild
              variant="outline"
              className="h-11 rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
            >
              <Link href="/invoices">Back to invoices</Link>
            </Button>

            <Button asChild className="h-11 rounded-xl bg-[#7F56D9] text-white hover:bg-[#6941C6]">
              <Link href={`/invoices/${invoice.id}/preview`}>
                <FileText className="mr-2 h-4 w-4" />
                Preview invoice
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvoiceDetailsHero;
