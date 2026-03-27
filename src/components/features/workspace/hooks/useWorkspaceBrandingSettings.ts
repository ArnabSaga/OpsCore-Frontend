"use client";

import { getWorkspaceBrandingSettings } from "@/components/features/workspace/api/workspace.api";
import { useQuery } from "@tanstack/react-query";

export const useWorkspaceBrandingSettings = (workspaceId: string) => {
  return useQuery({
    queryKey: ["workspace-branding-settings", workspaceId],
    queryFn: () => getWorkspaceBrandingSettings(workspaceId),
    enabled: !!workspaceId,
  });
};
