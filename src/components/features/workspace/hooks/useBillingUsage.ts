"use client";

import { getBillingUsage } from "@/components/features/workspace/api/workspace.api";
import { useQuery } from "@tanstack/react-query";
import { workspaceQueryKeys } from "@/components/features/workspace/hooks/workspace.query-keys";

export const useBillingUsage = (workspaceId: string) => {
  return useQuery({
    queryKey: workspaceId
      ? workspaceQueryKeys.billingUsage(workspaceId)
      : [...workspaceQueryKeys.all, "billing-usage", "disabled"],
    queryFn: () => getBillingUsage(workspaceId),
    enabled: !!workspaceId,
  });
};
