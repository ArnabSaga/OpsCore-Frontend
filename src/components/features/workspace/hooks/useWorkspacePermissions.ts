"use client";

import { getWorkspacePermissions } from "@/components/features/workspace/api/workspace.api";
import { useQuery } from "@tanstack/react-query";
import { workspaceQueryKeys } from "@/components/features/workspace/hooks/workspace.query-keys";

export const useWorkspacePermissions = (workspaceId: string) => {
  return useQuery({
    queryKey: workspaceId
      ? workspaceQueryKeys.permissions(workspaceId)
      : [...workspaceQueryKeys.all, "permissions", "disabled"],
    queryFn: () => getWorkspacePermissions(workspaceId),
    enabled: !!workspaceId,
  });
};
