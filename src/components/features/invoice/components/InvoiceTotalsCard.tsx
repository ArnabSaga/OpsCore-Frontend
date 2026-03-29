"use client";

import { useMemo } from "react";
import { Calculator, Wallet } from "lucide-react";

import { formatInvoiceMoney } from "@/components/features/invoice/utils/invoice-display";
import { Card, CardContent } from "@/components/ui/card";
import { InvoiceFormInstance } from "@/components/features/invoice/types/invoice-form.types";

type InvoiceTotalsCardProps = {
  form: InvoiceFormInstance;
};

const InvoiceTotalsCard = ({ form }: InvoiceTotalsCardProps) => {
  const currency = (form.state.values.currency || "USD").trim().toUpperCase();

  const summary = useMemo(() => {
    const items = form.state.values.items ?? [];

    const subtotal = items.reduce((sum: number, item) => {
      const quantity = Number(item.quantity || 0);
      const unitPrice = Number(item.unitPrice || 0);

      if (Number.isNaN(quantity) || Number.isNaN(unitPrice)) return sum;
      return sum + quantity * unitPrice;
    }, 0);

    return {
      lineItems: items.length,
      subtotal,
    };
  }, [form.state.values.items]);

  return (
    <Card className="rounded-[24px] border border-white/10 bg-[#101828]/80 text-white shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <CardContent className="p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[#0C111D]">
            <Calculator className="h-5 w-5 text-[#CBB5FF]" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Live totals</h3>
            <p className="text-sm text-[#94A3B8]">Preview the invoice math before submission.</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-[#667085]">Line items</p>
            <p className="mt-2 text-xl font-semibold text-white">{summary.lineItems}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
              <Wallet className="h-4 w-4 text-[#CBB5FF]" />
              Subtotal
            </div>
            <p className="mt-3 text-2xl font-semibold text-white">
              {formatInvoiceMoney(summary.subtotal, currency)}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-[#94A3B8]">
            Backend remains the source of truth for stored totals, but this preview keeps the form
            responsive and clear.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvoiceTotalsCard;
