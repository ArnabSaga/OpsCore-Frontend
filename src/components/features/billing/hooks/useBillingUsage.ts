"use client";

import { useQuery } from "@tanstack/react-query";

import { getBillingUsage } from "@/components/features/billing/api/billing.api";
import { billingQueryKeys } from "@/components/features/billing/hooks/billing.query-keys";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";

type UseBillingUsageOptions = {
  workspaceId?: string | null;
  enabled?: boolean;
};

export const useBillingUsage = ({ workspaceId, enabled = true }: UseBillingUsageOptions = {}) => {
  const { activeWorkspaceId } = useWorkspaceContext();
  const resolvedWorkspaceId = workspaceId ?? activeWorkspaceId;

  return useQuery({
    queryKey: resolvedWorkspaceId
      ? billingQueryKeys.usage(resolvedWorkspaceId)
      : [...billingQueryKeys.all, "usage", "no-workspace"],
    queryFn: () => getBillingUsage(resolvedWorkspaceId as string),
    enabled: enabled && !!resolvedWorkspaceId,
    staleTime: 1000 * 60,
  });
};
