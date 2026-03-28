"use client";

import { getWorkspaceSubscription } from "@/components/features/workspace/api/workspace.api";
import { useQuery } from "@tanstack/react-query";
import { workspaceQueryKeys } from "@/components/features/workspace/hooks/workspace.query-keys";

export const useWorkspaceSubscription = (workspaceId: string) => {
  return useQuery({
    queryKey: workspaceId
      ? workspaceQueryKeys.subscription(workspaceId)
      : [...workspaceQueryKeys.all, "subscription", "disabled"],
    queryFn: () => getWorkspaceSubscription(workspaceId),
    enabled: !!workspaceId,
  });
};
