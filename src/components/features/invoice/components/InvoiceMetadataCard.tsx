import { FileText, Mail, ReceiptText, User2 } from "lucide-react";

import type { InvoiceDetails } from "@/components/features/invoice/types/invoice.types";
import { formatInvoiceDate } from "@/components/features/invoice/utils/invoice-display";
import { Card, CardContent } from "@/components/ui/card";

type InvoiceMetadataCardProps = {
  invoice: InvoiceDetails;
};

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-start justify-between gap-4 border-b border-white/10 py-3 last:border-b-0 last:pb-0">
    <span className="text-sm text-[#667085]">{label}</span>
    <span className="max-w-[60%] text-right text-sm font-medium text-white">{value}</span>
  </div>
);

const InvoiceMetadataCard = ({ invoice }: InvoiceMetadataCardProps) => {
  return (
    <Card className="rounded-[24px] border border-white/10 bg-[#101828]/85 text-white shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <CardContent className="p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[#0C111D]">
            <ReceiptText className="h-5 w-5 text-[#CBB5FF]" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Invoice metadata</h2>
            <p className="text-sm text-[#94A3B8]">Customer, author, and lifecycle context.</p>
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
              <User2 className="h-4 w-4 text-[#CBB5FF]" />
              Customer
            </div>
            <p className="mt-3 text-base font-semibold text-white">
              {invoice.customerName || "Unnamed customer"}
            </p>
            <div className="mt-2 flex items-center gap-2 text-sm text-[#94A3B8]">
              <Mail className="h-4 w-4 text-[#CBB5FF]" />
              <span>{invoice.customerEmail || "No customer email"}</span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
              <FileText className="h-4 w-4 text-[#CBB5FF]" />
              Created by
            </div>
            <p className="mt-3 text-base font-semibold text-white">{invoice.createdByUser.name}</p>
            <p className="mt-1 text-sm text-[#94A3B8]">{invoice.createdByUser.email}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <InfoRow label="Issued at" value={formatInvoiceDate(invoice.issuedAt, "Not issued")} />
            <InfoRow label="Sent at" value={formatInvoiceDate(invoice.sentAt, "Not sent")} />
            <InfoRow label="Paid at" value={formatInvoiceDate(invoice.paidAt, "Not paid")} />
            <InfoRow
              label="Canceled at"
              value={formatInvoiceDate(invoice.canceledAt, "Not canceled")}
            />
          </div>

          {invoice.notes ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-medium text-white">Notes</p>
              <p className="mt-2 text-sm leading-6 text-[#94A3B8]">{invoice.notes}</p>
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
};

export default InvoiceMetadataCard;
