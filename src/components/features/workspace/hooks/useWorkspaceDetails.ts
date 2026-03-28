"use client";

import { getWorkspaceById } from "@/components/features/workspace/api/workspace.api";
import { useQuery } from "@tanstack/react-query";
import { workspaceQueryKeys } from "@/components/features/workspace/hooks/workspace.query-keys";

export const useWorkspaceDetails = (workspaceId: string) => {
  return useQuery({
    queryKey: workspaceId
      ? workspaceQueryKeys.detail(workspaceId)
      : [...workspaceQueryKeys.details(), "disabled"],
    queryFn: () => getWorkspaceById(workspaceId),
    enabled: !!workspaceId,
  });
};
