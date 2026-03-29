"use client";

import { useQuery } from "@tanstack/react-query";

import { getBillingHistory } from "@/components/features/billing/api/billing.api";
import { billingQueryKeys } from "@/components/features/billing/hooks/billing.query-keys";
import type { GetBillingHistoryParams } from "@/components/features/billing/types/billing.types";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";

type UseBillingHistoryOptions = {
  workspaceId?: string | null;
  params?: GetBillingHistoryParams;
  enabled?: boolean;
};

export const useBillingHistory = ({
  workspaceId,
  params,
  enabled = true,
}: UseBillingHistoryOptions = {}) => {
  const { activeWorkspaceId } = useWorkspaceContext();
  const resolvedWorkspaceId = workspaceId ?? activeWorkspaceId;

  return useQuery({
    queryKey: resolvedWorkspaceId
      ? billingQueryKeys.history(resolvedWorkspaceId, params)
      : [...billingQueryKeys.all, "history", "no-workspace"],
    queryFn: () => getBillingHistory(resolvedWorkspaceId as string, params),
    enabled: enabled && !!resolvedWorkspaceId,
    staleTime: 1000 * 30,
  });
};
