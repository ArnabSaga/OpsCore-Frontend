/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FormApi, ReactFormApi } from "@tanstack/react-form";

export type InvoiceFormValues = {
  customerName: string;
  customerEmail: string;
  currency: string;
  notes: string;
  dueAt: string;
  items: Array<{
    description: string;
    quantity: string;
    unitPrice: string;
  }>;
};

export type InvoiceFormInstance = FormApi<
  InvoiceFormValues,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any
> &
  ReactFormApi<
    InvoiceFormValues,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any
  >;
