"use client";

import { getWorkspaceCapabilities } from "@/components/features/workspace/api/workspace.api";
import { useQuery } from "@tanstack/react-query";
import { workspaceQueryKeys } from "@/components/features/workspace/hooks/workspace.query-keys";

export const useWorkspaceCapabilities = (workspaceId: string) => {
  return useQuery({
    queryKey: workspaceId
      ? workspaceQueryKeys.capabilities(workspaceId)
      : [...workspaceQueryKeys.all, "capabilities", "disabled"],
    queryFn: () => getWorkspaceCapabilities(workspaceId),
    enabled: !!workspaceId,
  });
};
