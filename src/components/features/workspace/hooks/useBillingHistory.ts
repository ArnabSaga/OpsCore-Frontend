"use client";

import { getBillingHistory } from "@/components/features/workspace/api/workspace.api";
import { useQuery } from "@tanstack/react-query";
import { workspaceQueryKeys } from "@/components/features/workspace/hooks/workspace.query-keys";

export const useBillingHistory = (workspaceId: string) => {
  return useQuery({
    queryKey: workspaceId
      ? workspaceQueryKeys.billingHistory(workspaceId)
      : [...workspaceQueryKeys.all, "billing-history", "disabled"],
    queryFn: () => getBillingHistory(workspaceId),
    enabled: !!workspaceId,
  });
};
