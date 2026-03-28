"use client";

import { updateWorkspaceBrandingSettings } from "@/components/features/workspace/api/workspace.api";
import type { WorkspaceBrandingSettings } from "@/types/workspace.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { workspaceQueryKeys } from "@/components/features/workspace/hooks/workspace.query-keys";

export const useUpdateWorkspaceBrandingSettings = (workspaceId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: WorkspaceBrandingSettings) =>
      updateWorkspaceBrandingSettings(workspaceId, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: workspaceQueryKeys.brandingSettings(workspaceId),
      });
      await queryClient.invalidateQueries({
        queryKey: workspaceQueryKeys.settingsSummary(workspaceId),
      });
    },
  });
};
