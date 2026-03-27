"use client";

import { getBillingUsage } from "@/components/features/workspace/api/workspace.api";
import { useQuery } from "@tanstack/react-query";

export const useBillingUsage = (workspaceId: string) => {
  return useQuery({
    queryKey: ["workspace-billing-usage", workspaceId],
    queryFn: () => getBillingUsage(workspaceId),
    enabled: !!workspaceId,
  });
};
