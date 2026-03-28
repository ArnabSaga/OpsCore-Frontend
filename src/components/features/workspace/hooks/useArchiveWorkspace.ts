"use client";

import { archiveWorkspace } from "@/components/features/workspace/api/workspace.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { workspaceQueryKeys } from "@/components/features/workspace/hooks/workspace.query-keys";
import { authQueryKeys } from "@/components/features/auth/hooks/auth.query-keys";

export const useArchiveWorkspace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (workspaceId: string) => archiveWorkspace(workspaceId),
    onSuccess: async (_data, workspaceId) => {
      await queryClient.invalidateQueries({ queryKey: workspaceQueryKeys.all });
      await queryClient.invalidateQueries({ queryKey: authQueryKeys.currentUser() });
      await queryClient.invalidateQueries({
        queryKey: workspaceQueryKeys.settingsSummary(workspaceId),
      });
    },
  });
};
