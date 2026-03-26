"use client";

import { getWorkspaceById } from "@/components/features/workspace/api/workspace.api";
import { useQuery } from "@tanstack/react-query";

export const useWorkspaceDetails = (workspaceId: string) => {
  return useQuery({
    queryKey: ["workspace", workspaceId],
    queryFn: () => getWorkspaceById(workspaceId),
    enabled: !!workspaceId,
  });
};
