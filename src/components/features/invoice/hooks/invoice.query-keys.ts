import type { GetInvoicesParams } from "@/components/features/invoice/types/invoice.types";

export const invoiceQueryKeys = {
  all: ["invoices"] as const,

  lists: () => [...invoiceQueryKeys.all, "list"] as const,
  list: (workspaceId: string, params?: GetInvoicesParams) =>
    [...invoiceQueryKeys.lists(), workspaceId, params ?? {}] as const,

  details: () => [...invoiceQueryKeys.all, "detail"] as const,
  detail: (workspaceId: string, invoiceId: string) =>
    [...invoiceQueryKeys.details(), workspaceId, invoiceId] as const,
} as const;
