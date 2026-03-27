"use client";

import { updateWorkspaceBrandingSettings } from "@/components/features/workspace/api/workspace.api";
import type { WorkspaceBrandingSettings } from "@/types/workspace.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateWorkspaceBrandingSettings = (workspaceId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: WorkspaceBrandingSettings) =>
      updateWorkspaceBrandingSettings(workspaceId, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["workspace-branding-settings", workspaceId],
      });
      await queryClient.invalidateQueries({
        queryKey: ["workspace-settings-summary", workspaceId],
      });
    },
  });
};
