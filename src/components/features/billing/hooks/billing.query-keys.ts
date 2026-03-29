import type { GetBillingHistoryParams } from "@/components/features/billing/types/billing.types";

export const billingQueryKeys = {
  all: ["billing"] as const,

  subscription: (workspaceId: string) =>
    [...billingQueryKeys.all, "subscription", workspaceId] as const,

  history: (workspaceId: string, params?: GetBillingHistoryParams) =>
    [...billingQueryKeys.all, "history", workspaceId, params ?? {}] as const,

  usage: (workspaceId: string) => [...billingQueryKeys.all, "usage", workspaceId] as const,
} as const;
