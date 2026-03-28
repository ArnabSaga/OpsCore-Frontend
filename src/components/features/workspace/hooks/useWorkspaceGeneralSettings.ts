"use client";

import { getWorkspaceGeneralSettings } from "@/components/features/workspace/api/workspace.api";
import { useQuery } from "@tanstack/react-query";
import { workspaceQueryKeys } from "@/components/features/workspace/hooks/workspace.query-keys";

export const useWorkspaceGeneralSettings = (workspaceId: string) => {
  return useQuery({
    queryKey: workspaceId
      ? workspaceQueryKeys.generalSettings(workspaceId)
      : [...workspaceQueryKeys.all, "general-settings", "disabled"],
    queryFn: () => getWorkspaceGeneralSettings(workspaceId),
    enabled: !!workspaceId,
  });
};
