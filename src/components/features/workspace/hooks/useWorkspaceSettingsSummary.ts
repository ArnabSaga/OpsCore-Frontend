"use client";

import { getWorkspaceSettingsSummary } from "@/components/features/workspace/api/workspace.api";
import { useQuery } from "@tanstack/react-query";

export const useWorkspaceSettingsSummary = (workspaceId: string) => {
  return useQuery({
    queryKey: ["workspace-settings-summary", workspaceId],
    queryFn: () => getWorkspaceSettingsSummary(workspaceId),
    enabled: !!workspaceId,
  });
};
