"use client";

import { getWorkspaceSubscription } from "@/components/features/workspace/api/workspace.api";
import { useQuery } from "@tanstack/react-query";

export const useWorkspaceSubscription = (workspaceId: string) => {
  return useQuery({
    queryKey: ["workspace-subscription", workspaceId],
    queryFn: () => getWorkspaceSubscription(workspaceId),
    enabled: !!workspaceId,
  });
};
