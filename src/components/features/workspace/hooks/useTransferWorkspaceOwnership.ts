"use client";

import { transferWorkspaceOwnership } from "@/components/features/workspace/api/workspace.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { workspaceQueryKeys } from "@/components/features/workspace/hooks/workspace.query-keys";
import { authQueryKeys } from "@/components/features/auth/hooks/auth.query-keys";

export const useTransferWorkspaceOwnership = (workspaceId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ memberId, confirm }: { memberId: string; confirm: true }) =>
      transferWorkspaceOwnership(workspaceId, memberId, { confirm }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: workspaceQueryKeys.members(workspaceId),
      });
      await queryClient.invalidateQueries({
        queryKey: workspaceQueryKeys.detail(workspaceId),
      });
      await queryClient.invalidateQueries({
        queryKey: workspaceQueryKeys.all,
      });
      await queryClient.invalidateQueries({
        queryKey: authQueryKeys.currentUser(),
      });
      await queryClient.invalidateQueries({
        queryKey: workspaceQueryKeys.capabilities(workspaceId),
      });
    },
  });
};
