"use client";

import { useQuery } from "@tanstack/react-query";

import { getCurrentWorkspaceSubscription } from "@/components/features/billing/api/billing.api";
import { billingQueryKeys } from "@/components/features/billing/hooks/billing.query-keys";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";

type UseBillingSubscriptionOptions = {
  workspaceId?: string | null;
  enabled?: boolean;
};

export const useBillingSubscription = ({
  workspaceId,
  enabled = true,
}: UseBillingSubscriptionOptions = {}) => {
  const { activeWorkspaceId } = useWorkspaceContext();
  const resolvedWorkspaceId = workspaceId ?? activeWorkspaceId;

  return useQuery({
    queryKey: resolvedWorkspaceId
      ? billingQueryKeys.subscription(resolvedWorkspaceId)
      : [...billingQueryKeys.all, "subscription", "no-workspace"],
    queryFn: () => getCurrentWorkspaceSubscription(resolvedWorkspaceId as string),
    enabled: enabled && !!resolvedWorkspaceId,
    staleTime: 1000 * 60,
  });
};
