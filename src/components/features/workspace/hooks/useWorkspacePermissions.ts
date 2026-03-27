"use client";

import { getWorkspacePermissions } from "@/components/features/workspace/api/workspace.api";
import { useQuery } from "@tanstack/react-query";

export const useWorkspacePermissions = (workspaceId: string) => {
  return useQuery({
    queryKey: ["workspace-permissions", workspaceId],
    queryFn: () => getWorkspacePermissions(workspaceId),
    enabled: !!workspaceId,
  });
};
