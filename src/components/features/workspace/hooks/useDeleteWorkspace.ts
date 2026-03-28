"use client";

import { deleteWorkspace } from "@/components/features/workspace/api/workspace.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { workspaceQueryKeys } from "@/components/features/workspace/hooks/workspace.query-keys";
import { authQueryKeys } from "@/components/features/auth/hooks/auth.query-keys";

export const useDeleteWorkspace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ workspaceId, confirmName }: { workspaceId: string; confirmName?: string }) =>
      deleteWorkspace(workspaceId, { confirmName }),
    onSuccess: async (_data, variables) => {
      await queryClient.invalidateQueries({ queryKey: workspaceQueryKeys.all });
      await queryClient.invalidateQueries({ queryKey: authQueryKeys.currentUser() });
      await queryClient.invalidateQueries({
        queryKey: workspaceQueryKeys.settingsSummary(variables.workspaceId),
      });
    },
  });
};
