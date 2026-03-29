import { BadgeDollarSign, CalendarDays, Clock3, Wallet } from "lucide-react";

import type { InvoiceDetails } from "@/components/features/invoice/types/invoice.types";
import {
  formatInvoiceDate,
  formatInvoiceMoney,
} from "@/components/features/invoice/utils/invoice-display";
import { Card, CardContent } from "@/components/ui/card";

type InvoiceSummaryCardProps = {
  invoice: InvoiceDetails;
};

const InvoiceSummaryCard = ({ invoice }: InvoiceSummaryCardProps) => {
  return (
    <Card className="rounded-[24px] border border-white/10 bg-[#1D2939]/80 text-white shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <CardContent className="p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[#0C111D]">
            <BadgeDollarSign className="h-5 w-5 text-[#CBB5FF]" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Invoice summary</h2>
            <p className="text-sm text-[#94A3B8]">Core financial and lifecycle details.</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-2 text-[#94A3B8]">
              <Wallet className="h-4 w-4 text-[#CBB5FF]" />
              <span className="text-sm">Amount</span>
            </div>
            <p className="mt-3 text-2xl font-semibold text-white">
              {formatInvoiceMoney(invoice.amount, invoice.currency)}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-2 text-[#94A3B8]">
              <CalendarDays className="h-4 w-4 text-[#CBB5FF]" />
              <span className="text-sm">Due date</span>
            </div>
            <p className="mt-3 text-base font-semibold text-white">
              {formatInvoiceDate(invoice.dueAt, "No due date")}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-2 text-[#94A3B8]">
              <Clock3 className="h-4 w-4 text-[#CBB5FF]" />
              <span className="text-sm">Created</span>
            </div>
            <p className="mt-3 text-base font-semibold text-white">
              {formatInvoiceDate(invoice.createdAt)}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-2 text-[#94A3B8]">
              <Clock3 className="h-4 w-4 text-[#CBB5FF]" />
              <span className="text-sm">Updated</span>
            </div>
            <p className="mt-3 text-base font-semibold text-white">
              {formatInvoiceDate(invoice.updatedAt)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvoiceSummaryCard;
