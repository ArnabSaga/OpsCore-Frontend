"use client";

import { transferWorkspaceOwnership } from "@/components/features/workspace/api/workspace.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useTransferWorkspaceOwnership = (workspaceId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ memberId, confirm }: { memberId: string; confirm: true }) =>
      transferWorkspaceOwnership(workspaceId, memberId, { confirm }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["workspace-members", workspaceId] });
      await queryClient.invalidateQueries({ queryKey: ["workspace", workspaceId] });
      await queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      await queryClient.invalidateQueries({ queryKey: ["auth", "current-user"] });
      await queryClient.invalidateQueries({ queryKey: ["workspace-capabilities", workspaceId] });
    },
  });
};
