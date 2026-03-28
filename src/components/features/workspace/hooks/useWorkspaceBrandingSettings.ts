"use client";

import { getWorkspaceBrandingSettings } from "@/components/features/workspace/api/workspace.api";
import { useQuery } from "@tanstack/react-query";
import { workspaceQueryKeys } from "@/components/features/workspace/hooks/workspace.query-keys";

export const useWorkspaceBrandingSettings = (workspaceId: string) => {
  return useQuery({
    queryKey: workspaceId
      ? workspaceQueryKeys.brandingSettings(workspaceId)
      : [...workspaceQueryKeys.all, "branding-settings", "disabled"],
    queryFn: () => getWorkspaceBrandingSettings(workspaceId),
    enabled: !!workspaceId,
  });
};
