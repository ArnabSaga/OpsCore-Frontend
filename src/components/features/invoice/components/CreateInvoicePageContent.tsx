"use client";

import gsap from "gsap";
import { ReceiptText, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import InvoiceForm from "@/components/features/invoice/components/InvoiceForm";
import { useCreateInvoice } from "@/components/features/invoice/hooks/useCreateInvoice";
import type {
  CreateInvoicePayload,
  InvoiceDetails,
} from "@/components/features/invoice/types/invoice.types";

const CreateInvoicePageContent = () => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { mutateAsync: createInvoice, isPending } = useCreateInvoice();
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-invoice-form-hero]",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" }
      );

      gsap.fromTo(
        "[data-invoice-form-card]",
        { opacity: 0, y: 28, scale: 0.985 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          delay: 0.08,
          ease: "power3.out",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleCreateInvoice = async (payload: CreateInvoicePayload) => {
    setSubmitError(null);

    try {
      const createdInvoice = (await createInvoice(payload)) as InvoiceDetails;
      router.replace(`/invoices/${createdInvoice.id}`);
      router.refresh();
      return createdInvoice;
    } catch (error) {
      if (error instanceof Error) {
        setSubmitError(error.message);
      } else {
        setSubmitError("Failed to create invoice. Please try again.");
      }
    }
  };

  return (
    <div ref={containerRef} className="space-y-8">
      <section
        data-invoice-form-hero
        className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#101828] px-6 py-7 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl md:px-8"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(127,86,217,0.24),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(105,65,198,0.16),transparent_30%)]" />

        <div className="relative z-10 flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#7F56D9]/20 bg-[#7F56D9]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#CBB5FF]">
              <Sparkles className="h-3.5 w-3.5" />
              Create invoice
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                Build a client-ready invoice with live totals
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#94A3B8] md:text-base">
                Add billing context, invoice items, due date, and delivery information. The backend
                remains the source of truth for amount calculation and invoice lifecycle rules.
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:min-w-[360px]">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <ReceiptText className="mb-3 h-5 w-5 text-[#CBB5FF]" />
              <p className="text-xs uppercase tracking-[0.16em] text-[#667085]">
                Server-calculated
              </p>
              <p className="mt-2 text-base font-semibold text-white">Amounts & line totals</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <ReceiptText className="mb-3 h-5 w-5 text-[#CBB5FF]" />
              <p className="text-xs uppercase tracking-[0.16em] text-[#667085]">Lifecycle-safe</p>
              <p className="mt-2 text-base font-semibold text-white">Ready for send / pay flow</p>
            </div>
          </div>
        </div>
      </section>

      <div data-invoice-form-card>
        <InvoiceForm
          mode="create"
          isSubmitting={isPending}
          submitError={submitError}
          submitLabel="Create Invoice"
          cancelHref="/invoices"
          onSubmit={handleCreateInvoice}
        />
      </div>
    </div>
  );
};

export default CreateInvoicePageContent;
