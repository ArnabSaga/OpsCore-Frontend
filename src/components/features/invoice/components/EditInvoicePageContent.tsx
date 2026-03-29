"use client";

import gsap from "gsap";
import { AlertTriangle, PencilLine } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import InvoiceForm from "@/components/features/invoice/components/InvoiceForm";
import { useInvoiceDetails } from "@/components/features/invoice/hooks/useInvoiceDetails";
import { useUpdateInvoice } from "@/components/features/invoice/hooks/useUpdateInvoice";
import type { InvoiceFormValues } from "@/components/features/invoice/types/invoice-form.types";
import type {
  InvoiceDetails,
  UpdateInvoicePayload,
} from "@/components/features/invoice/types/invoice.types";
import { getDisplayInvoiceStatus } from "@/components/features/invoice/utils/invoice-display";
import ProtectedPageErrorState from "@/components/shared/error-state/ProtectedPageErrorState";
import { Button } from "@/components/ui/button";

type EditInvoicePageContentProps = {
  invoiceId: string;
};

const toDateInputValue = (value?: string | null) => {
  if (!value) return "";
  return new Date(value).toISOString().slice(0, 10);
};

const EditInvoicePageContent = ({ invoiceId }: EditInvoicePageContentProps) => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { data: invoice, isLoading, isError, refetch } = useInvoiceDetails({ invoiceId });

  const { mutateAsync: updateInvoice, isPending } = useUpdateInvoice();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const resolvedInvoice = invoice as InvoiceDetails | undefined;
  const displayStatus = resolvedInvoice ? getDisplayInvoiceStatus(resolvedInvoice) : null;
  const canEdit = displayStatus !== "PAID" && displayStatus !== "CANCELED";

  const initialValues = useMemo<Partial<InvoiceFormValues> | undefined>(() => {
    if (!resolvedInvoice) return undefined;

    return {
      customerName: resolvedInvoice.customerName ?? "",
      customerEmail: resolvedInvoice.customerEmail ?? "",
      currency: resolvedInvoice.currency ?? "USD",
      notes: resolvedInvoice.notes ?? "",
      dueAt: toDateInputValue(resolvedInvoice.dueAt),
      items:
        resolvedInvoice.items.length > 0
          ? resolvedInvoice.items.map((item) => ({
              description: item.description,
              quantity: String(item.quantity),
              unitPrice: item.unitPrice,
            }))
          : [{ description: "", quantity: "1", unitPrice: "" }],
    };
  }, [resolvedInvoice]);

  useEffect(() => {
    if (!containerRef.current || isLoading) return;

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
  }, [isLoading]);

  const handleUpdateInvoice = async (payload: UpdateInvoicePayload) => {
    setSubmitError(null);

    try {
      const updatedInvoice = (await updateInvoice({
        invoiceId,
        payload,
      })) as InvoiceDetails;

      router.replace(`/invoices/${updatedInvoice.id}`);
      router.refresh();
      return updatedInvoice;
    } catch (error) {
      if (error instanceof Error) {
        setSubmitError(error.message);
      } else {
        setSubmitError("Failed to update invoice. Please try again.");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="h-[220px] animate-pulse rounded-[24px] border border-white/10 bg-[#101828]" />
        <div className="h-[640px] animate-pulse rounded-[24px] border border-white/10 bg-[#101828]" />
      </div>
    );
  }

  if (isError || !resolvedInvoice) {
    return (
      <ProtectedPageErrorState
        title="Unable to load invoice edit form"
        description="We couldn't load the invoice details needed for editing."
        onRetry={() => {
          void refetch();
        }}
      />
    );
  }

  if (!canEdit) {
    return (
      <div className="space-y-8">
        <section
          data-invoice-form-hero
          className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#101828] px-6 py-7 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl md:px-8"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(127,86,217,0.22),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(105,65,198,0.16),transparent_30%)]" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-200">
              <AlertTriangle className="h-3.5 w-3.5" />
              Editing unavailable
            </div>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
              This invoice can no longer be edited
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#94A3B8] md:text-base">
              The backend blocks editing for paid and canceled invoices. Review the invoice details
              or use preview mode instead.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                onClick={() => router.replace(`/invoices/${invoiceId}`)}
                className="rounded-xl bg-[#7F56D9] text-white hover:bg-[#6941C6]"
              >
                Open Details
              </Button>
              <Button
                variant="outline"
                onClick={() => router.replace(`/invoices/${invoiceId}/preview`)}
                className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
              >
                Open Preview
              </Button>
            </div>
          </div>
        </section>
      </div>
    );
  }

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
              <PencilLine className="h-3.5 w-3.5" />
              Edit invoice
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                Update {resolvedInvoice.invoiceNumber}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#94A3B8] md:text-base">
                Adjust invoice metadata and line items while the invoice is still editable under
                backend lifecycle rules.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 xl:w-[320px]">
            <p className="text-xs uppercase tracking-[0.16em] text-[#667085]">Current status</p>
            <p className="mt-2 text-lg font-semibold text-white">{displayStatus}</p>
            <p className="mt-2 text-sm text-[#94A3B8]">
              Paid and canceled invoices are locked by the backend and cannot be updated.
            </p>
          </div>
        </div>
      </section>

      <div data-invoice-form-card>
        <InvoiceForm
          mode="edit"
          initialValues={initialValues}
          isSubmitting={isPending}
          submitError={submitError}
          submitLabel="Save Changes"
          cancelHref={`/invoices/${invoiceId}`}
          onSubmit={handleUpdateInvoice}
        />
      </div>
    </div>
  );
};

export default EditInvoicePageContent;
