"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { acceptInvitation } from "@/components/features/workspace/api/workspace.api";
import { workspaceQueryKeys } from "@/components/features/workspace/hooks/workspace.query-keys";
import { authQueryKeys } from "@/components/features/auth/hooks/auth.query-keys";

export const useAcceptInvitation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (token: string) => acceptInvitation(token),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: workspaceQueryKeys.all });
      await queryClient.invalidateQueries({ queryKey: authQueryKeys.currentUser() });
      await queryClient.invalidateQueries({ queryKey: workspaceQueryKeys.myInvitations() });
    },
  });
};
