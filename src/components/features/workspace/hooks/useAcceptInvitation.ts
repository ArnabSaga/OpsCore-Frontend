"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { acceptInvitation } from "@/components/features/workspace/api/workspace.api";

export const useAcceptInvitation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (token: string) => acceptInvitation(token),
    onSuccess: async () => {
      // Invalidate my workspaces to reflect the new membership
      await queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      // Invalidate current user to reflect possible default workspace update
      await queryClient.invalidateQueries({ queryKey: ["auth", "current-user"] });
    },
  });
};
