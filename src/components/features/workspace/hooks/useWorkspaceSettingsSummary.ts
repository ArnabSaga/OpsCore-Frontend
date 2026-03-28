"use client";

import { getWorkspaceSettingsSummary } from "@/components/features/workspace/api/workspace.api";
import { useQuery } from "@tanstack/react-query";
import { workspaceQueryKeys } from "@/components/features/workspace/hooks/workspace.query-keys";

export const useWorkspaceSettingsSummary = (workspaceId: string) => {
  return useQuery({
    queryKey: workspaceId
      ? workspaceQueryKeys.settingsSummary(workspaceId)
      : [...workspaceQueryKeys.all, "settings-summary", "disabled"],
    queryFn: () => getWorkspaceSettingsSummary(workspaceId),
    enabled: !!workspaceId,
  });
};
