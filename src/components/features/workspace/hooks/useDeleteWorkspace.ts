"use client";

import { deleteWorkspace } from "@/components/features/workspace/api/workspace.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteWorkspace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ workspaceId, confirmName }: { workspaceId: string; confirmName?: string }) =>
      deleteWorkspace(workspaceId, { confirmName }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      await queryClient.invalidateQueries({ queryKey: ["auth", "current-user"] });
      await queryClient.invalidateQueries({ queryKey: ["workspace-settings-summary"] });
    },
  });
};
