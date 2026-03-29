import type {
  InvoiceListItem,
  InvoiceStatus,
} from "@/components/features/invoice/types/invoice.types";

export const isInvoiceOverdue = (invoice: Pick<InvoiceListItem, "status" | "dueAt">) => {
  if (!invoice.dueAt) return false;
  if (invoice.status === "PAID" || invoice.status === "CANCELED") return false;
  return new Date(invoice.dueAt).getTime() < Date.now();
};

export const getDisplayInvoiceStatus = (
  invoice: Pick<InvoiceListItem, "status" | "dueAt">
): InvoiceStatus => {
  if (invoice.status === "PAID") return "PAID";
  if (invoice.status === "CANCELED") return "CANCELED";
  if (isInvoiceOverdue(invoice)) return "OVERDUE";
  return "PENDING";
};

export const formatInvoiceDate = (value?: string | null, emptyLabel = "Not set") => {
  if (!value) return emptyLabel;

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
};

export const formatInvoiceMoney = (amount: string | number, currency = "USD") => {
  const numericAmount = Number(amount);

  if (Number.isNaN(numericAmount)) {
    return `${currency} ${amount}`;
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(numericAmount);
};
