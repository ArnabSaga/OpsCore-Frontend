"use client";

import { getWorkspaceGeneralSettings } from "@/components/features/workspace/api/workspace.api";
import { useQuery } from "@tanstack/react-query";

export const useWorkspaceGeneralSettings = (workspaceId: string) => {
  return useQuery({
    queryKey: ["workspace-general-settings", workspaceId],
    queryFn: () => getWorkspaceGeneralSettings(workspaceId),
    enabled: !!workspaceId,
  });
};
