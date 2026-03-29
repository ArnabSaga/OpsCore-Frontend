import { CheckCircle2, Clock3, Send, XCircle } from "lucide-react";

import type { InvoiceDetails } from "@/components/features/invoice/types/invoice.types";
import { formatInvoiceDate } from "@/components/features/invoice/utils/invoice-display";
import { Card, CardContent } from "@/components/ui/card";

type InvoiceActivitySummaryProps = {
  invoice: InvoiceDetails;
};

const InvoiceActivitySummary = ({ invoice }: InvoiceActivitySummaryProps) => {
  const timeline = [
    {
      key: "created",
      label: "Created",
      value: formatInvoiceDate(invoice.createdAt),
      icon: Clock3,
      active: true,
      accent: "text-[#CBB5FF]",
    },
    {
      key: "issued",
      label: "Issued",
      value: formatInvoiceDate(invoice.issuedAt, "Not yet issued"),
      icon: Clock3,
      active: !!invoice.issuedAt,
      accent: "text-amber-300",
    },
    {
      key: "sent",
      label: "Sent",
      value: formatInvoiceDate(invoice.sentAt, "Not yet sent"),
      icon: Send,
      active: !!invoice.sentAt,
      accent: "text-sky-300",
    },
    {
      key: "paid",
      label: "Paid",
      value: formatInvoiceDate(invoice.paidAt, "Not paid"),
      icon: CheckCircle2,
      active: !!invoice.paidAt,
      accent: "text-emerald-300",
    },
    {
      key: "canceled",
      label: "Canceled",
      value: formatInvoiceDate(invoice.canceledAt, "Not canceled"),
      icon: XCircle,
      active: !!invoice.canceledAt,
      accent: "text-red-300",
    },
  ];

  return (
    <Card className="rounded-[24px] border border-white/10 bg-[#101828]/85 text-white shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold text-white">Activity timeline</h2>
        <p className="mt-1 text-sm text-[#94A3B8]">
          Operational milestones based on the invoice lifecycle fields.
        </p>

        <div className="mt-6 space-y-4">
          {timeline.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.key}
                className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-[#0C111D] ${item.accent}`}
                >
                  <Icon className="h-4 w-4" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-medium text-white">{item.label}</p>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] ${
                        item.active ? "bg-white/10 text-white" : "bg-transparent text-[#667085]"
                      }`}
                    >
                      {item.active ? "Recorded" : "Pending"}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-[#94A3B8]">{item.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default InvoiceActivitySummary;
