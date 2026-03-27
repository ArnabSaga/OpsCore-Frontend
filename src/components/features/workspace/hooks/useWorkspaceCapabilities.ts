"use client";

import { getWorkspaceCapabilities } from "@/components/features/workspace/api/workspace.api";
import { useQuery } from "@tanstack/react-query";

export const useWorkspaceCapabilities = (workspaceId: string) => {
  return useQuery({
    queryKey: ["workspace-capabilities", workspaceId],
    queryFn: () => getWorkspaceCapabilities(workspaceId),
    enabled: !!workspaceId,
  });
};
