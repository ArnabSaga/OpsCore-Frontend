import type { GetPlatformInvoicesParams } from "@/components/features/invoice/types/invoice.types";

export const platformInvoiceQueryKeys = {
  all: ["platform-invoices"] as const,

  lists: () => [...platformInvoiceQueryKeys.all, "list"] as const,
  list: (params?: GetPlatformInvoicesParams) =>
    [...platformInvoiceQueryKeys.lists(), params ?? {}] as const,

  stats: () => [...platformInvoiceQueryKeys.all, "stats"] as const,
} as const;
