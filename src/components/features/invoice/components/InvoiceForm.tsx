"use client";

import { useForm } from "@tanstack/react-form";
import { CheckCircle2, ReceiptText, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import InvoiceFormFields from "@/components/features/invoice/components/InvoiceFormFields";
import InvoiceTotalsCard from "@/components/features/invoice/components/InvoiceTotalsCard";
import {
  createInvoiceSchema,
  updateInvoiceSchema,
} from "@/components/features/invoice/validation/invoice.validation";
import AppSubmitButton from "@/components/form/AppSubmitButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type {
  CreateInvoicePayload,
  InvoiceDetails,
  UpdateInvoicePayload,
} from "@/components/features/invoice/types/invoice.types";
import { InvoiceFormValues } from "@/components/features/invoice/types/invoice-form.types";

type BaseInvoiceFormProps = {
  initialValues?: Partial<InvoiceFormValues>;
  isSubmitting?: boolean;
  submitError?: string | null;
  submitLabel?: string;
  cancelHref?: string;
};

type CreateInvoiceFormProps = BaseInvoiceFormProps & {
  mode: "create";
  onSubmit: (payload: CreateInvoicePayload) => Promise<InvoiceDetails | void>;
};

type EditInvoiceFormProps = BaseInvoiceFormProps & {
  mode: "edit";
  onSubmit: (payload: UpdateInvoicePayload) => Promise<InvoiceDetails | void>;
};

type InvoiceFormProps = CreateInvoiceFormProps | EditInvoiceFormProps;

const defaultValues: InvoiceFormValues = {
  customerName: "",
  customerEmail: "",
  currency: "USD",
  notes: "",
  dueAt: "",
  items: [{ description: "", quantity: "1", unitPrice: "" }],
};

const toIsoDateTime = (value?: string) => {
  if (!value) return null;
  return new Date(`${value}T00:00:00.000Z`).toISOString();
};

const InvoiceForm = (props: InvoiceFormProps) => {
  const {
    mode,
    initialValues,
    isSubmitting = false,
    submitError,
    submitLabel,
    cancelHref = "/invoices",
  } = props;
  const [localSubmitError, setLocalSubmitError] = useState<string | null>(null);

  const mergedValues = useMemo(
    () => ({
      ...defaultValues,
      ...initialValues,
      items:
        initialValues?.items && initialValues.items.length > 0
          ? initialValues.items
          : defaultValues.items,
    }),
    [initialValues]
  );

  const form = useForm({
    defaultValues: mergedValues,
    onSubmit: async ({ value }) => {
      setLocalSubmitError(null);

      const normalized = {
        customerName: value.customerName,
        customerEmail: value.customerEmail,
        currency: value.currency,
        notes: value.notes,
        dueAt: value.dueAt ? toIsoDateTime(value.dueAt) : null,
        items: value.items.map((item) => ({
          description: item.description,
          quantity: Number(item.quantity),
          unitPrice: item.unitPrice,
        })),
      };

      const parsed =
        mode === "create"
          ? createInvoiceSchema.safeParse(normalized)
          : updateInvoiceSchema.safeParse({
              customerName: value.customerName.trim() ? value.customerName.trim() : null,
              customerEmail: value.customerEmail.trim()
                ? value.customerEmail.trim().toLowerCase()
                : null,
              currency: value.currency.trim() || undefined,
              notes: value.notes.trim() ? value.notes.trim() : null,
              dueAt: value.dueAt ? toIsoDateTime(value.dueAt) : null,
              items: normalized.items,
            });

      if (!parsed.success) {
        setLocalSubmitError(parsed.error.issues[0]?.message || "Invalid form data.");
        return;
      }

      if (mode === "create") {
        const payload: CreateInvoicePayload = {
          customerName: parsed.data.customerName?.trim() || undefined,
          customerEmail: parsed.data.customerEmail?.trim().toLowerCase() || undefined,
          currency: parsed.data.currency?.trim().toUpperCase() || undefined,
          notes: parsed.data.notes?.trim() || undefined,
          dueAt: parsed.data.dueAt ?? null,
          items: (parsed.data.items ?? []).map((item) => ({
            description: item.description.trim(),
            quantity: Number(item.quantity),
            unitPrice: item.unitPrice.trim(),
          })),
        };

        await props.onSubmit(payload);
        return;
      }

      const payload: UpdateInvoicePayload = {
        customerName: parsed.data.customerName === null ? null : parsed.data.customerName?.trim(),
        customerEmail:
          parsed.data.customerEmail === null
            ? null
            : parsed.data.customerEmail?.trim().toLowerCase(),
        currency: parsed.data.currency?.trim().toUpperCase() || undefined,
        notes: parsed.data.notes === null ? null : parsed.data.notes?.trim(),
        dueAt: parsed.data.dueAt ?? null,
        items: (parsed.data.items ?? normalized.items).map((item) => ({
          description: item.description.trim(),
          quantity: Number(item.quantity),
          unitPrice: item.unitPrice.trim(),
        })),
      };

      await props.onSubmit(payload);
    },
  });

  const primaryLabel = submitLabel ?? (mode === "create" ? "Create Invoice" : "Save Changes");

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
      <Card className="rounded-[24px] border border-white/10 bg-[#1D2939]/80 text-white shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl">
        <CardContent className="p-6 md:p-8">
          <div className="mb-6 flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[#0C111D] shadow-[0_14px_30px_rgba(0,0,0,0.28)]">
              <ReceiptText className="h-5 w-5 text-[#CBB5FF]" />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white">
                {mode === "create" ? "Invoice details" : "Update invoice"}
              </h2>
              <p className="mt-1 text-sm leading-6 text-[#94A3B8]">
                This form mirrors backend invoice validation, item constraints, and nullable update
                behavior.
              </p>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              void form.handleSubmit();
            }}
            className="space-y-6"
          >
            <InvoiceFormFields form={form} mode={mode} />

            {submitError || localSubmitError ? (
              <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {submitError || localSubmitError}
              </div>
            ) : null}

            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <Button
                asChild
                type="button"
                variant="outline"
                className="h-12 rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10 sm:w-auto"
              >
                <Link href={cancelHref}>Cancel</Link>
              </Button>

              <div className="flex-1">
                <AppSubmitButton isSubmitting={isSubmitting}>{primaryLabel}</AppSubmitButton>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <InvoiceTotalsCard form={form} />

        <Card className="rounded-[24px] border border-white/10 bg-[#101828]/80 text-white shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[#12B76A]/20 bg-[#12B76A]/10">
              <CheckCircle2 className="h-5 w-5 text-[#6CE9A6]" />
            </div>

            <h3 className="text-lg font-semibold text-white">Backend-aligned behavior</h3>
            <p className="mt-2 text-sm leading-6 text-[#94A3B8]">
              Paid and canceled invoices cannot be edited by the backend, and item totals are always
              recalculated server-side.
            </p>

            <div className="mt-6 space-y-3">
              <div className="rounded-2xl border border-white/10 bg-white/3 p-4">
                <p className="text-sm font-medium text-white">Nullable edit mode</p>
                <p className="mt-1 text-sm text-[#94A3B8]">
                  Empty optional fields are sent as null where needed so previous values can be
                  removed.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/3 p-4">
                <p className="text-sm font-medium text-white">Server-side invoice math</p>
                <p className="mt-1 text-sm text-[#94A3B8]">
                  Quantity × unit price is recalculated by the backend for each row and for the full
                  invoice amount.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/3 p-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#CBB5FF]" />
                  <p className="text-sm font-medium text-white">Workspace-safe requests</p>
                </div>
                <p className="mt-1 text-sm text-[#94A3B8]">
                  The active workspace remains enforced through your existing authenticated frontend
                  and backend middleware.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InvoiceForm;
