"use client";

import gsap from "gsap";
import { ArrowLeft, FileText, Mail, Printer, User2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef } from "react";

import InvoiceStatusBadge from "@/components/features/invoice/components/InvoiceStatusBadge";
import { useInvoiceDetails } from "@/components/features/invoice/hooks/useInvoiceDetails";
import type { InvoiceDetails } from "@/components/features/invoice/types/invoice.types";
import {
  formatInvoiceDate,
  formatInvoiceMoney,
  getDisplayInvoiceStatus,
} from "@/components/features/invoice/utils/invoice-display";
import ProtectedPageErrorState from "@/components/shared/error-state/ProtectedPageErrorState";
import { Button } from "@/components/ui/button";

type InvoicePreviewPageContentProps = {
  invoiceId: string;
};

const InvoicePreviewSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="h-[160px] animate-pulse rounded-[24px] border border-white/10 bg-[#101828]" />
      <div className="h-[800px] animate-pulse rounded-[24px] border border-white/10 bg-[#101828]" />
    </div>
  );
};

const InvoicePreviewPageContent = ({ invoiceId }: InvoicePreviewPageContentProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const printRef = useRef<HTMLDivElement | null>(null);

  const { data, isLoading, isError, refetch } = useInvoiceDetails({ invoiceId });

  const invoice = data as InvoiceDetails | undefined;
  const displayStatus = useMemo(
    () => (invoice ? getDisplayInvoiceStatus(invoice) : null),
    [invoice]
  );

  useEffect(() => {
    if (!containerRef.current || isLoading || !invoice) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-invoice-preview-hero]",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );

      gsap.fromTo(
        "[data-invoice-preview-sheet]",
        { opacity: 0, y: 28, scale: 0.99 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.62,
          delay: 0.08,
          ease: "power3.out",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isLoading, invoice]);

  const handlePrint = () => {
    window.print();
  };

  if (isLoading) {
    return <InvoicePreviewSkeleton />;
  }

  if (isError || !invoice) {
    return (
      <ProtectedPageErrorState
        title="Unable to load invoice preview"
        description="We couldn't load the invoice preview right now."
        onRetry={() => {
          void refetch();
        }}
      />
    );
  }

  return (
    <div ref={containerRef} className="space-y-6 print:space-y-0">
      <section
        data-invoice-preview-hero
        className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#101828] px-6 py-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl print:hidden md:px-8"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(127,86,217,0.24),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(105,65,198,0.16),transparent_30%)]" />

        <div className="relative z-10 flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#7F56D9]/20 bg-[#7F56D9]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#CBB5FF]">
              <FileText className="h-3.5 w-3.5" />
              Invoice preview
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                {invoice.invoiceNumber}
              </h1>
              <p className="mt-2 text-sm leading-6 text-[#94A3B8] md:text-base">
                This preview is rendered in HTML because the current backend does not expose a PDF
                download endpoint. Use print for a clean export-friendly view.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              variant="outline"
              className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
            >
              <Link href={`/invoices/${invoice.id}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to details
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
            >
              <Link href={`/invoices/${invoice.id}/edit`}>Edit invoice</Link>
            </Button>

            <Button
              onClick={handlePrint}
              className="rounded-xl bg-[#7F56D9] text-white hover:bg-[#6941C6]"
            >
              <Printer className="mr-2 h-4 w-4" />
              Print invoice
            </Button>
          </div>
        </div>
      </section>

      <div
        data-invoice-preview-sheet
        ref={printRef}
        className="mx-auto max-w-5xl rounded-[28px] border border-white/10 bg-white p-8 text-slate-900 shadow-[0_24px_80px_rgba(0,0,0,0.35)] print:max-w-none print:rounded-none print:border-0 print:shadow-none md:p-12"
      >
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-6 border-b border-slate-200 pb-8 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#7F56D9]/20 bg-[#7F56D9]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#6941C6]">
                OpsCore Invoice
              </div>

              <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950">
                {invoice.invoiceNumber}
              </h2>

              <div className="mt-4">
                <InvoiceStatusBadge invoice={invoice} />
              </div>
            </div>

            <div className="grid gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-5 md:min-w-[280px]">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Amount</p>
                <p className="mt-2 text-3xl font-bold text-slate-950">
                  {formatInvoiceMoney(invoice.amount, invoice.currency)}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-500">Issued</p>
                  <p className="mt-1 font-medium text-slate-900">
                    {formatInvoiceDate(invoice.issuedAt, "Not issued")}
                  </p>
                </div>
                <div>
                  <p className="text-slate-500">Due</p>
                  <p className="mt-1 font-medium text-slate-900">
                    {formatInvoiceDate(invoice.dueAt, "No due date")}
                  </p>
                </div>
              </div>

              <div className="text-sm text-slate-600">
                Status shown here reflects the current lifecycle view, including overdue display
                derived from due date.
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Billed to</p>
              <div className="mt-4 flex items-start gap-3">
                <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-200 text-slate-700">
                  <User2 className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-base font-semibold text-slate-950">
                    {invoice.customerName || "Unnamed customer"}
                  </p>
                  <div className="mt-1 flex items-center gap-2 text-sm text-slate-600">
                    <Mail className="h-4 w-4" />
                    <span>{invoice.customerEmail || "No customer email"}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Prepared by</p>
              <div className="mt-4">
                <p className="text-base font-semibold text-slate-950">
                  {invoice.createdByUser.name}
                </p>
                <p className="mt-1 text-sm text-slate-600">{invoice.createdByUser.email}</p>
                <p className="mt-4 text-sm text-slate-600">
                  Created {formatInvoiceDate(invoice.createdAt)} • Updated{" "}
                  {formatInvoiceDate(invoice.updatedAt)}
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-200">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-[0.14em] text-slate-500">
                <tr>
                  <th className="px-6 py-4">Description</th>
                  <th className="px-6 py-4">Qty</th>
                  <th className="px-6 py-4">Unit price</th>
                  <th className="px-6 py-4 text-right">Line total</th>
                </tr>
              </thead>

              <tbody>
                {invoice.items.map((item) => (
                  <tr key={item.id} className="border-t border-slate-200">
                    <td className="px-6 py-4 text-slate-900">{item.description}</td>
                    <td className="px-6 py-4 text-slate-900">{item.quantity}</td>
                    <td className="px-6 py-4 text-slate-900">
                      {formatInvoiceMoney(item.unitPrice, invoice.currency)}
                    </td>
                    <td className="px-6 py-4 text-right font-semibold text-slate-950">
                      {formatInvoiceMoney(item.lineTotal, invoice.currency)}
                    </td>
                  </tr>
                ))}
              </tbody>

              <tfoot>
                <tr className="border-t border-slate-200 bg-slate-50">
                  <td className="px-6 py-5" colSpan={3}>
                    <span className="text-sm font-semibold text-slate-700">Total</span>
                  </td>
                  <td className="px-6 py-5 text-right text-xl font-bold text-slate-950">
                    {formatInvoiceMoney(invoice.amount, invoice.currency)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {invoice.notes ? (
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Notes</p>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-700">
                {invoice.notes}
              </p>
            </div>
          ) : null}

          <div className="grid gap-4 border-t border-slate-200 pt-6 text-sm text-slate-600 md:grid-cols-4">
            <div>
              <p className="text-slate-500">Status</p>
              <p className="mt-1 font-medium text-slate-900">{displayStatus}</p>
            </div>
            <div>
              <p className="text-slate-500">Sent at</p>
              <p className="mt-1 font-medium text-slate-900">
                {formatInvoiceDate(invoice.sentAt, "Not sent")}
              </p>
            </div>
            <div>
              <p className="text-slate-500">Paid at</p>
              <p className="mt-1 font-medium text-slate-900">
                {formatInvoiceDate(invoice.paidAt, "Not paid")}
              </p>
            </div>
            <div>
              <p className="text-slate-500">Canceled at</p>
              <p className="mt-1 font-medium text-slate-900">
                {formatInvoiceDate(invoice.canceledAt, "Not canceled")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePreviewPageContent;
