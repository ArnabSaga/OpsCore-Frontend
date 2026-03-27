"use client";

import { getBillingHistory } from "@/components/features/workspace/api/workspace.api";
import { useQuery } from "@tanstack/react-query";

export const useBillingHistory = (workspaceId: string) => {
  return useQuery({
    queryKey: ["workspace-billing-history", workspaceId],
    queryFn: () => getBillingHistory(workspaceId),
    enabled: !!workspaceId,
  });
};
