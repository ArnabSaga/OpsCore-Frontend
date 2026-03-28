"use client";

import { updateWorkspaceGeneralSettings } from "@/components/features/workspace/api/workspace.api";
import type { WorkspaceGeneralSettings } from "@/types/workspace.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { workspaceQueryKeys } from "@/components/features/workspace/hooks/workspace.query-keys";

export const useUpdateWorkspaceGeneralSettings = (workspaceId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: WorkspaceGeneralSettings) =>
      updateWorkspaceGeneralSettings(workspaceId, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: workspaceQueryKeys.generalSettings(workspaceId),
      });
      await queryClient.invalidateQueries({
        queryKey: workspaceQueryKeys.detail(workspaceId),
      });
      await queryClient.invalidateQueries({
        queryKey: workspaceQueryKeys.all,
      });
      await queryClient.invalidateQueries({
        queryKey: workspaceQueryKeys.settingsSummary(workspaceId),
      });
    },
  });
};
