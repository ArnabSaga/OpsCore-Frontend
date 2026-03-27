"use client";

import { updateWorkspaceGeneralSettings } from "@/components/features/workspace/api/workspace.api";
import type { WorkspaceGeneralSettings } from "@/types/workspace.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateWorkspaceGeneralSettings = (workspaceId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: WorkspaceGeneralSettings) =>
      updateWorkspaceGeneralSettings(workspaceId, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["workspace-general-settings", workspaceId],
      });
      await queryClient.invalidateQueries({
        queryKey: ["workspace", workspaceId],
      });
      await queryClient.invalidateQueries({
        queryKey: ["workspaces"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["workspace-settings-summary", workspaceId],
      });
    },
  });
};
